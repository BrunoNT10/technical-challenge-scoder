import { Controller, Get, Post, Body } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.dto';

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