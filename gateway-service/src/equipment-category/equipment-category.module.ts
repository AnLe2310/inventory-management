import { Module } from '@nestjs/common';
import { EquipmentCategoryController } from './equipment-category.controller';
import { ClientModule } from 'src/client.module';

@Module({
  imports: [ClientModule],
  controllers: [EquipmentCategoryController]
})
export class EquipmentCategoryModule { }
