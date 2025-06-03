import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Delete,
  Body, 
  Param 
} from '@nestjs/common';
import { Product } from './entities/product.entity';
import { 
  CreateProductService, 
  ListProductService,
  UpdateProductService,
  DeleteProductService,
  UpdateCacheService
} from './product.service';
import { 
  CreateProductDto, 
  CreateProductResponseDto, 
  UpdateProductResponseDto, 
  ListProductResponseDto,
  DeleteProductResponseDto
} from './dto/product.dto';
import { OperationsMessages, OperationStatus, ParamsDescriptions } from 'src/utils/enums';

@Controller("products")
export class ProductController {
  constructor(
    private readonly createProductService: CreateProductService, 
    private readonly listProductService: ListProductService,
    private readonly updateProductService: UpdateProductService,
    private readonly deleteProductService: DeleteProductService,
    private readonly updateCacheService: UpdateCacheService,
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
  
  @Patch(':id')
  async updateProduct (
    @Param('id') id: number, 
    @Body() updates: Product
  ): Promise<UpdateProductResponseDto> {
    const updateProduct = await this.updateProductService.updateProduct(id, updates)
    return new UpdateProductResponseDto(
      OperationStatus.SUCCESS, 
      OperationsMessages.SUCCESS_WHEN_UPDATE_ITEM, 
      updateProduct
    );
  }
  
  @Delete(':id')
  async deleteProduct(@Param('id') id: number):Promise<DeleteProductResponseDto> {
    await this.deleteProductService.deleteProduct(id);
    return new DeleteProductResponseDto(
      OperationStatus.SUCCESS,
      OperationsMessages.SUCCESS_WHEN_DELETE_ITEM
    )
  }
  
  @Post('cache')
  async updateCache(): Promise<void> {
    await this.updateCacheService.updateCache()
  }
}


