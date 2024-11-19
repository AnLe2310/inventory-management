import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EquipmentReport } from './interfaces/equipmentReport.interface';
import { Model } from 'mongoose';

@Injectable()
export class EquipmentReportService {
    constructor(@InjectModel('EquipmentReport') private readonly EquipmentReportModel: Model<EquipmentReport>) { }

    getEquipmentReport(keyword: string) {
        if (!keyword) return this.EquipmentReportModel.find();
        
        return this.EquipmentReportModel.find({
            $or: [
                { equipmentId: { $regex: keyword, $options: 'i' } },
                { userId: { $regex: keyword, $options: 'i' } },
                { departmentId: { $regex: keyword, $options: 'i' } },
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { status: { $regex: keyword, $options: 'i' } }
            ]
        });
    }

    getEquipmentReportById(id: string) {
        return this.EquipmentReportModel.findById(id);
    }

    createEquipmentReport(equipmentReport: any) {
        return this.EquipmentReportModel.create(equipmentReport);
    }

    updateEquipmentReport(equipmentReport: any) {
        return this.EquipmentReportModel.findByIdAndUpdate(equipmentReport.id, equipmentReport, { new: true });
    }

    deleteEquipmentReport(id: string) {
        return this.EquipmentReportModel.findByIdAndDelete(id);
    }
}
