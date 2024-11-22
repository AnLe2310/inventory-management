import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Equipment } from './interfaces/equipment.interface';
import { AsyncParser } from '@json2csv/node';
import { flatten } from '@json2csv/transforms';

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
        return this.EquipmentModel.aggregate([
            {
                $match: {
                    $or: [{
                        _id: new Types.ObjectId(`${id}`)
                    }]
                }
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

    createEquipment(equipment: any) {
        return this.EquipmentModel.create(equipment);
    }

    updateEquipment(equipment: any) {
        return this.EquipmentModel.findByIdAndUpdate(equipment.id, equipment, { new: true });
    }

    deleteEquipment(id: any) {
        return this.EquipmentModel.findByIdAndDelete(id);
    }

    async exportEquipment() {
        const data = await this.EquipmentModel.aggregate([{
            $project: {
                __v: 0
            }
        }]);
        
        const specKeys = new Set();
    
        data.forEach(item => {
            if (item.specifications && typeof item.specifications === 'object') {
                Object.keys(item.specifications).forEach(key => {
                    specKeys.add(key);
                });
            }
        });
    
        const baseFields = [
            { value: "_id", label: "Id" },
            { value: "name", label: "Name" },
            { value: "description", label: "Description" },
            { value: "categoryId", label: "CategoryId" },
            { value: "departmentId", label: "DepartmentId" },
            { value: "status", label: "Status" },
            { value: "condition", label: "Condition" },
            { value: "isActive", label: "IsActive" },
            { value: "createdAt", label: "CreatedAt" },
            { value: "updatedAt", label: "UpdatedAt" },
        ];
    
        const specFields = Array.from(specKeys).map(key => ({
            value: `specifications.${key}`,
            label: (key as string).charAt(0).toUpperCase() + (key as string).slice(1)
        }));
    
        const opts = {
            fields: [...baseFields, ...specFields]
        };

        const parser = new AsyncParser({
            fields: opts.fields,
            transforms: [flatten({ objects: true })]
        });
        const csv = await parser.parse(data).promise();
        return csv;
    }
}