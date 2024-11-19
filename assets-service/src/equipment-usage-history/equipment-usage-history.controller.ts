import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { EquipmentUsageHistoryService } from './equipment-usage-history.service';
import { MessagePattern } from '@nestjs/microservices';
import { EquipmentCategoryUpdateDTO } from 'src/equipment-category/dto/equipmentCategoryUpdate.dto';
import { EquipmentCategoryCreateDTO } from 'src/equipment-category/dto/equipmentCategoryCreate.dto';

@Controller('equipment-usage-history')
export class EquipmentUsageHistoryController {
    constructor(private readonly EquipmentUsageHistoryService: EquipmentUsageHistoryService) { }

    @MessagePattern({ cmd: "assets_equipment-usage-history_getAll" })
    @Get()
    async getEquipmentUsageHistory(payload: { keyword: string; }) {
        return await this.EquipmentUsageHistoryService.getEquipmentUsageHistory(payload.keyword);
    }

    @MessagePattern({ cmd: "assets_equipment-usage-history_getById" })
    @Get()
    async getEquipmentUsageHistoryById(payload: { id: string; }) {
        return await this.EquipmentUsageHistoryService.getEquipmentUsageHistoryById(payload.id);
    }

    @MessagePattern({ cmd: "assets_equipment-usage-history_create" })
    @Post()
    async createEquipmentUsageHistory(payload: EquipmentCategoryCreateDTO) {
        return await this.EquipmentUsageHistoryService.createEquipmentUsageHistory(payload);
    }

    @MessagePattern({ cmd: "assets_equipment-usage-history_update" })
    @Patch()
    async updateEquipmentUsageHistory(payload: EquipmentCategoryUpdateDTO) {
        return await this.EquipmentUsageHistoryService.updateEquipmentUsageHistory(payload);
    }

    @MessagePattern({ cmd: "assets_equipment-usage-history_delete" })
    @Delete()
    async deleteEquipmentUsageHistory(payload: { id: string; }) {
        return await this.EquipmentUsageHistoryService.deleteEquipmentUsageHistory(payload.id);
    }
}
