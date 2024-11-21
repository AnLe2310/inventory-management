import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from 'global/response.interceptor';
import { ExceptionInterceptor } from 'global/exception.interceptor';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3003'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Inventory Management System')
    .setDescription('')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }, 'access-token')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new ExceptionInterceptor());

  await app.listen(process.env.GATEWAY_PORT ?? 3000, process.env.GATEWAY_HOST);
}
bootstrap();

