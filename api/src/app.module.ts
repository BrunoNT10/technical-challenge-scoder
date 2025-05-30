import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductModule } from './modules/product.module'; 
import { Product } from './modules/entities/product.entity';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
