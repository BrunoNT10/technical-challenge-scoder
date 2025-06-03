import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';        

import { ProductController } from './product.controller';
import { 
  CreateProductService, 
  DeleteProductService, 
  ListProductService, 
  UpdateProductService,
  UpdateCacheService
} from './product.service';
import { Product } from './entities/product.entity';
import { RedisModule } from 'src/modules/redis/redis.module';
import { ProductGateway } from './websocket/product.websocket';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]), 
    RedisModule
  ],
  controllers: [
    ProductController
  ],
  providers: [
    CreateProductService,
    ListProductService,
    UpdateProductService,
    DeleteProductService,
    UpdateCacheService,
    ProductGateway
  ],
})
export class ProductModule {}
