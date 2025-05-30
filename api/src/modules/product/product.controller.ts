import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductService, ListProductService } from './product.service';
import { CreateProductDto, CreateProductResponseDto, ListProductResponseDto } from './dto/product.dto';
import { OperationsMessages, OperationStatus, ParamsDescriptions } from 'src/utils/enums';
import { count } from 'console';

@Controller("products")
export class ProductController {
  constructor(
    private readonly createProductService: CreateProductService, 
    private readonly listProductService: ListProductService
  ) {}
  
  @Get()
  async listProduct(): Promise<Record<string, any>> {
    const productsList = await this.listProductService.getProducts() 
    const countItems = productsList.length
    return new ListProductResponseDto(
      OperationStatus.SUCCESS, 
      OperationsMessages.SUCCESS_WHEN_LIST_ITEMS, 
      productsList, 
      countItems
    )
  }
  
  @Post()
  async createProduct(@Body() product: CreateProductDto): Promise<CreateProductResponseDto> {
    const savedProduct = await this.createProductService.saveProduct(product)
    return new CreateProductResponseDto(
      OperationStatus.SUCCESS, 
      OperationsMessages.SUCCESS_WHEN_CREATE_NEW_ITEM, 
      savedProduct
    );
  }
}