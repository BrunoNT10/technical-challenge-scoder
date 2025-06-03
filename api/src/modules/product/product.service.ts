import { Inject, Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Product } from './entities/product.entity'
import { Redis } from 'ioredis'
import { OperationsMessages, ConstantsValues } from '../../utils/enums'
import { ProductGateway } from './websocket/product.websocket'
@Injectable()
export class CreateProductService {
    constructor (
        @InjectRepository(Product) 
        private readonly productRepository: Repository<Product>, 
        @Inject('REDIS_CLIENT')
        private readonly redisClient: Redis,
        private productGateway: ProductGateway
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
        
        this.productGateway.sendNewProduct(savedProduct)
    
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

@Injectable()
export class UpdateProductService {
    constructor (
        @InjectRepository(Product) private readonly productRepository: Repository<Product>, 
        @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
        private productGateway: ProductGateway
    ) {}
    
    private readonly logger = new Logger(CreateProductService.name)
    
    async updateDatabaseItem(id: number, updates: Partial<Product>): Promise<Product> {
        const product = await this.productRepository.findOneOrFail({ where: { id }})
        Object.assign(product, updates)
        return await this.productRepository.save(product)
    }
    
    async updateRedisItem(id: number, updates: Partial<Product>): Promise<void> {
        const redisKey = `product:${id}`
        const redisStringItem = await this.redisClient.get(redisKey)
        if (redisStringItem) {
            const redisJsonItem = JSON.parse(redisStringItem)
            Object.keys(updates).forEach((key) => {
                redisJsonItem[key] = updates[key]
            })
            await this.redisClient.set(redisKey, JSON.stringify(redisJsonItem))
        }
    }
    
    async updateProduct(id: number, updates: Partial<Product>): Promise<Product> {
        let updatedProduct
        try{
            updatedProduct = await this.updateDatabaseItem(id, updates)        
        }
        catch (error: unknown) {
            this.logger.error(`${OperationsMessages.ERROR_WHEN_UPDATE_DATABASE_PRODUCT} ${error}`)
            throw new HttpException(
                OperationsMessages.ERROR_WHEN_UPDATE_PRODUCT, 
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
        try{
            await this.updateRedisItem(id, updates)        
        }
        catch (error: unknown) {
            this.logger.error(`${OperationsMessages.ERROR_WHEN_UPDATE_REDIS_PRODUCT} ${error}`)
            throw new HttpException(
                OperationsMessages.ERROR_WHEN_UPDATE_PRODUCT, 
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
        
        this.productGateway.sendUpdatedProduct(updatedProduct)    
        
        return updatedProduct
    }
}

@Injectable()
export class DeleteProductService {
    constructor (
        @InjectRepository(Product) private readonly productRepository: Repository<Product>, 
        @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
        private productGateway: ProductGateway
    ) {}
    
    private readonly logger = new Logger(CreateProductService.name)
    
    async deleteDatabaseItem(id: number): Promise<void> {
        await this.productRepository.delete(id)
    }
    
    async deleteRedisItem(id: number): Promise<void> {
        const redisKey = `product:${id}`
        await this.redisClient.del(redisKey)
    }
    
    async deleteProduct(id: number): Promise<void> {
        try {
            await this.deleteDatabaseItem(id)
        }
        catch (error: unknown) {
            this.logger.error(`${OperationsMessages.ERROR_WHEN_DELETE_DATABASE_PRODUCT} ${error}`)
            throw new HttpException(
                OperationsMessages.ERROR_WHEN_DELETE_PRODUCT, 
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
        try {
            await this.deleteRedisItem(id)
        }
        catch (error: unknown) {
            this.logger.error(`${OperationsMessages.ERROR_WHEN_DELETE_REDIS_PRODUCT} ${error}`)
            throw new HttpException(
                OperationsMessages.ERROR_WHEN_DELETE_PRODUCT, 
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
        this.productGateway.sendDeletedProduct(id)
    }
}

@Injectable()
export class UpdateCacheService {
    constructor (
        @InjectRepository(Product) private readonly productRepository: Repository<Product>, 
        @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
    ) {}
    
    private readonly logger = new Logger(CreateProductService.name)
    
    async updateCache (): Promise<void> {
        try{
            const products = await this.productRepository.find()
                Array.from(products).forEach((product: Product) => {
                const productKey = `product:${product.id}`
                this.redisClient.set(productKey, JSON.stringify(product))
            })
        }
        catch(error: unknown) {
            this.logger.error(`${OperationsMessages.ERROR_WHEN_UPDATE_CACHE} ${error}`)
            throw new HttpException(
                OperationsMessages.ERROR_WHEN_UPDATE_CACHE, 
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
        this.logger.log("Cache updated successfully!")
    }
}