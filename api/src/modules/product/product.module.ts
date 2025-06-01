import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';        
import { CreateProductService, ListProductService } from './product.service';
import { Product } from './entities/product.entity';
import { RedisModule } from 'src/modules/redis/redis.module';
import { ProductGateway } from './websocket/product.websocket';
// import { AppService } from './app.service';

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
    ProductGateway
  ],
})
export class ProductModule {}
