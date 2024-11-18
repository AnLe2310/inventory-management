import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EquipmentReport } from './interfaces/equipmentReport.interface';
import { Model } from 'mongoose';

@Injectable()
export class EquipmentReportService {
    constructor(@InjectModel('EquipmentReport') private readonly EquipmentReportModel: Model<EquipmentReport>) { }

    getEquipmentReport() {
        return this.EquipmentReportModel.find();
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

    deleteEquipmentReport(id:string) {
        return this.EquipmentReportModel.findByIdAndDelete(id);
    }
}
