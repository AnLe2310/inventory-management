import { Module } from '@nestjs/common';
import { EquipmentCategoryController } from './equipment-category.controller';
import { EquipmentCategoryService } from './equipment-category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EquipmentCategorySchema } from './schemas/equipmentCategory.schema';
import { EquipmentModule } from 'src/equipment/equipment.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: "EquipmentCategory", schema: EquipmentCategorySchema}]),
    EquipmentModule
  ],
  controllers: [EquipmentCategoryController],
  providers: [EquipmentCategoryService]
})
export class EquipmentCategoryModule {}
