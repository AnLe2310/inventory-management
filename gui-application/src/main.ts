import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as hbs from 'express-handlebars';
import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, 'client', 'public'));
  app.setBaseViewsDir(join(__dirname, 'client', 'views'));
  app.engine('hbs', hbs.engine({ extname: "hbs" }));
  app.setViewEngine('hbs');

  console.log(`app start on http://localhost:${process.env.PORT}`);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
