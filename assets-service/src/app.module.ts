import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DepartmentsModule } from './departments/departments.module';
import { EquipmentCategoryModule } from './equipment-category/equipment-category.module';
import { RoleModule } from './role/role.module';
import { EquipmentModule } from './equipment/equipment.module';
import { EquipmentReportModule } from './equipment-report/equipment-report.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(process.env.DATABASE),
    DepartmentsModule,
    EquipmentCategoryModule,
    RoleModule,
    EquipmentModule,
    EquipmentReportModule,
  ]
})
export class AppModule { }
