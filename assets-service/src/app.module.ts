import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DepartmentsModule } from './departments/departments.module';
import { EquipmentCategoryModule } from './equipment-category/equipment-category.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(process.env.DATABASE),
    DepartmentsModule,
    EquipmentCategoryModule,
  ]
})
export class AppModule { }
