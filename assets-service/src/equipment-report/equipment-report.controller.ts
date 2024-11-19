import { MessagePattern } from '@nestjs/microservices';
import { EquipmentReportCreateDTO } from './dto/equipmentReportCreate.dto';
import { EquipmentReportUpdateDTO } from './dto/equipmentReportUpdate.dto';
import { EquipmentReportService } from './equipment-report.service';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('equipment-report')
export class EquipmentReportController {
    constructor(private readonly EquipmentReportService: EquipmentReportService) { }

    @MessagePattern({ cmd: "assets_equipment-report_getAll" })
    @Get()
    async getEquipmentReport(payload: { keyword: string; }) {
        return await this.EquipmentReportService.getEquipmentReport(payload.keyword);
    }

    @MessagePattern({ cmd: "assets_equipment-report_getById" })
    @Get()
    async getEquipmentReportById(payload: { id: string; }) {
        return await this.EquipmentReportService.getEquipmentReportById(payload.id);
    }

    @MessagePattern({ cmd: "assets_equipment-report_create" })
    @Post()
    async createEquipmentReport(payload: EquipmentReportCreateDTO) {
        return await this.EquipmentReportService.createEquipmentReport(payload);
    }

    @MessagePattern({ cmd: "assets_equipment-report_update" })
    @Patch()
    async updateEquipmentReport(payload: EquipmentReportUpdateDTO) {
        return await this.EquipmentReportService.updateEquipmentReport(payload);;
    }

    @MessagePattern({ cmd: "assets_equipment-report_delete" })
    @Delete()
    async deleteEquipmentReport(payload: { id: string; }) {
        return await this.EquipmentReportService.deleteEquipmentReport(payload.id);
    }
}
