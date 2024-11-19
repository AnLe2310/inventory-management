import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Equipment } from './interfaces/equipment.interface';

@Injectable()
export class EquipmentService {
    constructor(@InjectModel('Equipment') private readonly EquipmentModel: Model<Equipment>) { }

    getEquipment(keyword: string) {
        return this.EquipmentModel.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { categoryId: { $regex: keyword, $options: 'i' } },
                { departmentId: { $regex: keyword, $options: 'i' } },
                { status: { $regex: keyword, $options: 'i' } },
                { condition: { $regex: keyword, $options: 'i' } }
            ]
        });
    }

    getEquipmentById(id: any) {
        return this.EquipmentModel.findById(id);
    }

    createEquipment(equipment: any) {
        return this.EquipmentModel.create(equipment);
    }

    updateEquipment(equipment: any) {
        return this.EquipmentModel.findByIdAndUpdate(equipment.id, equipment, { new: true });
    }

    deleteEquipment(id: any) {
        return this.EquipmentModel.findByIdAndDelete(id);
    }
}
