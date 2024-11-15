import { Module } from '@nestjs/common';
import { EquipmentCategoryController } from './equipment-category.controller';
import { EquipmentCategoryService } from './equipment-category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EquipmentCategorySchema } from './schemas/equipmentCategory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: "EquipmentCategory", schema: EquipmentCategorySchema}])
  ],
  controllers: [EquipmentCategoryController],
  providers: [EquipmentCategoryService]
})
export class EquipmentCategoryModule {}
