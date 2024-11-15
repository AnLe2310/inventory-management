import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EquipmentCategory } from './interfaces/equipmentCategory.interface';

@Injectable()
export class EquipmentCategoryService {
    constructor(@InjectModel("EquipmentCategory") private readonly EquipmentCategoryModel: Model<EquipmentCategory>) { }

    getEquipmentCategory() {
        return this.EquipmentCategoryModel.find()
    }

    getEquipmentCategoryById(id: any) {
        return this.EquipmentCategoryModel.findById(id)
    }

    createEquipmentCategory(equipmentCategory: any) {
        return new this.EquipmentCategoryModel(equipmentCategory).save()
    }

    updateEquipmentCategory(equipmentCategory: any) {
        return this.EquipmentCategoryModel.findByIdAndUpdate(equipmentCategory.id, equipmentCategory, {new: true})
    }

    deleteEquipmentCategory(id: any) {
        return this.EquipmentCategoryModel.findByIdAndDelete(id)
    }
}
