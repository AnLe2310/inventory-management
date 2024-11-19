import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EquipmentUsageHistory } from './interfaces/equipmentUsageHistory.interface';

@Injectable()
export class EquipmentUsageHistoryService {
    constructor(@InjectModel('EquipmentUsageHistory') private readonly EquipmentUsageHistoryModel: Model<EquipmentUsageHistory>) { }

    async getEquipmentUsageHistory(keyword?: string) {
        if (!keyword) return this.EquipmentUsageHistoryModel.find();

        return await this.EquipmentUsageHistoryModel.find({
            $or: [
                { equipmentId: { $regex: keyword, $options: 'i' } },
                { userId: { $regex: keyword, $options: 'i' } },
                { "condition.before": { $regex: keyword, $options: 'i' } },
                { "condition.after": { $regex: keyword, $options: 'i' } }
            ]
        });
    }

    async getEquipmentUsageHistoryById(id: string) {
        return await this.EquipmentUsageHistoryModel.findById(id);
    }

    async createEquipmentUsageHistory(equipmentUsageHistory: any) {
        return await this.EquipmentUsageHistoryModel.create(equipmentUsageHistory);
    }

    async updateEquipmentUsageHistory(equipmentUsageHistory: any) {
        return await this.EquipmentUsageHistoryModel.findByIdAndUpdate(equipmentUsageHistory.id, equipmentUsageHistory, { new: true });
    }

    async deleteEquipmentUsageHistory(id: string) {
        return await this.EquipmentUsageHistoryModel.findByIdAndDelete(id);
    }
}
