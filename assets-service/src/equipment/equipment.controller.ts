import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { MessagePattern } from '@nestjs/microservices';
import { EquipmentCreateDTO } from './dto/equipmentCreate.dto';
import { EquipmentUpdateDTO } from './dto/equipmentUpdate.dto';

@Controller('equipment')
export class EquipmentController {
    constructor(private readonly EquipmentService: EquipmentService) { }

    @MessagePattern({ cmd: "assets_equipment_getAll" })
    @Get()
    async getEquipment() {
        return await this.EquipmentService.getEquipment();
    }

    @MessagePattern({ cmd: "assets_equipment_getById" })
    @Get()
    async getEquipmentById(payload: { id: any; }) {
        return await this.EquipmentService.getEquipmentById(payload.id);
    }

    @MessagePattern({ cmd: "assets_equipment_create" })
    @Post()
    async createEquipment(payload: EquipmentCreateDTO) {
        return await this.EquipmentService.createEquipment(payload);
    }

    @MessagePattern({ cmd: "assets_equipment_update" })
    @Patch()
    async updateEquipment(payload: EquipmentUpdateDTO) {
        return await this.EquipmentService.updateEquipment(payload);
    }

    @MessagePattern({ cmd: "assets_equipment_delete" })
    @Delete()
    async deleteEquipment(payload: { id: any; }) {
        return await this.EquipmentService.deleteEquipment(payload.id);
    }
}
