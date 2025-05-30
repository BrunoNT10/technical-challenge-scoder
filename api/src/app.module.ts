import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductModule } from './modules/product/product.module'; 
import { Product } from './modules/product/entities/product.entity';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from './modules/redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',   
      port: 3306,
      username: 'root',     
      password: '160704',      
      database: 'products', 
      entities: [Product],     
      synchronize: true,  
    }),
    RedisModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
