import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { DepartmentsModule } from './departments/departments.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(process.env.DATABASE),
    CategoryModule,
    DepartmentsModule,
  ]
})
export class AppModule { }
