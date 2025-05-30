import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from './entities/product.entity'

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) 
        private readonly productRepository: Repository<Product>
    ) {}
    
    createProduct(product: Partial<Product>): Promise<Product> {
        const newProduct = this.productRepository.create(product);
        const promiseProduct = this.productRepository.save(newProduct);
        return promiseProduct;
    }
}