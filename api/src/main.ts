import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config(); 
  
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  
  const config = new DocumentBuilder()
    .setTitle('API de Produtos')
    .setDescription('Documentação da API de produtos')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000, '0.0.0.0');
}
bootstrap(); 
