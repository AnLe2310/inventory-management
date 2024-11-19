import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EquipmentCategory } from './interfaces/equipmentCategory.interface';
import { EquipmentService } from 'src/equipment/equipment.service';

@Injectable()
export class EquipmentCategoryService {
    constructor(
        @InjectModel("EquipmentCategory") private readonly EquipmentCategoryModel: Model<EquipmentCategory>,
        private readonly EquipmentService: EquipmentService
    ) { }

    getEquipmentCategory(keyword?: string) {
        if (!keyword) return this.EquipmentCategoryModel.find();

        return this.EquipmentCategoryModel.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ]
        });
    }

    getEquipmentCategoryById(id: any) {
        return this.EquipmentCategoryModel.findById(id);
    }

    createEquipmentCategory(equipmentCategory: any) {
        return new this.EquipmentCategoryModel(equipmentCategory).save();
    }

    updateEquipmentCategory(equipmentCategory: any) {
        return this.EquipmentCategoryModel.findByIdAndUpdate(equipmentCategory.id, equipmentCategory, { new: true });
    }

    async deleteEquipmentCategory(id: any) {
        const equipments = await this.EquipmentService.getEquipment(id);

        for (const equipment of equipments)
            await this.EquipmentService.deleteEquipment(equipment.id);

        return await this.EquipmentCategoryModel.findByIdAndDelete(id);
    }
}
