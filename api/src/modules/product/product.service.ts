import { Inject, Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from './entities/product.entity'
import { Redis } from 'ioredis'
import { OperationsMessages, ConstantsValues } from '../../utils/enums'

@Injectable()
export class CreateProductService {
    constructor (
        @InjectRepository(Product) 
        private readonly productRepository: Repository<Product>, 
        @Inject('REDIS_CLIENT')
        private readonly redisClient: Redis
    ) {}
    
    private readonly logger = new Logger(CreateProductService.name)
    
    async createNewDatabaseItem(product: Partial<Product>): Promise<Product> {
        const newProduct = this.productRepository.create(product);
        const savedProduct = this.productRepository.save(newProduct);
        this.logger.log(`Product created successfully. Item created: ${savedProduct}`);
        
        return savedProduct;
    }
    
    async createNewRedisItem(product: Partial<Product>): Promise<void> {
        const redisKey = `product:${product.id}`;
        const redisValue = JSON.stringify(product)
        await this.redisClient.set(redisKey, redisValue)        
    }   
    
    async saveProduct(product: Partial<Product>): Promise<Product> {
        let savedProduct; 
        try{
            savedProduct = await this.createNewDatabaseItem(product)        
        }
        catch (error: unknown) {
            this.logger.error(`${OperationsMessages.ERROR_WHEN_CREATE_DATABASE_PRODUCT} ${error}`);
            throw new HttpException(
                OperationsMessages.ERROR_WHEN_CREATE_DATABASE_PRODUCT, 
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        } 
        
        try{
            await this.createNewRedisItem(savedProduct)        
        }
        catch (error: unknown) {
            this.logger.error(`${OperationsMessages.ERROR_WHEN_CREATE_REDIS_PRODUCT} ${error}`)
            throw new HttpException(
                OperationsMessages.ERROR_WHEN_CREATE_REDIS_PRODUCT, 
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
        
        return savedProduct;
    }
}

@Injectable()
export class ListProductService {
    constructor (
        @InjectRepository(Product) private readonly productRepository: Repository<Product>, 
        @Inject('REDIS_CLIENT') private readonly redisClient: Redis
    ) {}
    
    private readonly logger = new Logger(CreateProductService.name)
    
    async getRedisKeys(
        cursor: string = ConstantsValues.REDIS_INITIAL_CURSOR, 
        pattern: string = ConstantsValues.REDIS_SCAN_PRODUCTS_PATTERN,
    ): Promise<string[]> {
        const redisKeys: string[] = [];
        do {
            const [newCursor, items] = await this.redisClient.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
            cursor = newCursor;
            redisKeys.push(...items)
        }
        while (cursor !== ConstantsValues.REDIS_FINAL_CURSOR)
        
        return redisKeys
    }
    
    async getProducts(): Promise<Record<string, any>[]> {
        let redisKeys;
        try{
            redisKeys = await this.getRedisKeys();                
        }
        catch(error: unknown) {
            this.logger.error(`${OperationsMessages.ERROR_WHEN_GET_REDIS_KEYS} ${error}`)
            throw new HttpException(
                OperationsMessages.ERROR_WHEN_LIST_PRODUCTS, 
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
        
        this.logger.log(redisKeys)
        
        if (redisKeys.length == 0) {
            throw new HttpException(
                OperationsMessages.PRODUCTS_ITEMS_NOT_FOUND,
                HttpStatus.NOT_FOUND
            )
        }
        
        const items: Record<string, any>[] = (
            await Promise.all(redisKeys.map(async (key) => {
                const productString = await this.redisClient.get(key);
                let item;
                productString ? item = JSON.parse(productString) : item = null;
                item ? item["key"] = key : null;
                return item;
            }))
        )
        
        return items;
    }
}