import { Controller, Get, Post, Body } from '@nestjs/common';
import { Product } from '../modules/entities/product.entity';
import { ProductService } from '../modules/product.service';
import { CreateProductDto } from '../modules/dto/product.dto';

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  
  @Get()
  getProduct(): string {
    return "testing"
  }
  
  @Post()
  createProduct(@Body() product: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(product)
  }
}