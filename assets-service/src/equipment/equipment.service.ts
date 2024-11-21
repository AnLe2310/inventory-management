import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Equipment } from './interfaces/equipment.interface';

@Injectable()
export class EquipmentService {
    constructor(@InjectModel('Equipment') private readonly EquipmentModel: Model<Equipment>) { }

    getEquipment(keyword?: string) {
        let query = {};

        if (keyword)
            query = {
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } },
                    { "category.name": { $regex: keyword, $options: 'i' } },
                    { "department.name": { $regex: keyword, $options: 'i' } },
                    { status: { $regex: keyword, $options: 'i' } },
                    { condition: { $regex: keyword, $options: 'i' } }
                ]
            };

        return this.EquipmentModel.aggregate([
            {
                $match: query
            },
            {
                $lookup: {
                    from: 'equipmentcategories',
                    let: { categoryId: { $toObjectId: '$categoryId' } },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$_id', '$$categoryId'] } } },
                        { $project: { _id: 1, name: 1, description: 1 } }
                    ],
                    as: 'category'
                }
            },
            {
                $lookup: {
                    from: 'departments',
                    let: { departmentId: { $toObjectId: '$departmentId' } },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$_id', '$$departmentId'] } } },
                        { $project: { _id: 1, name: 1, description: 1 } }
                    ],
                    as: 'department'
                }
            },
            {
                $project: {
                    categoryId: 0,
                    departmentId: 0,
                }
            }
        ]);
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