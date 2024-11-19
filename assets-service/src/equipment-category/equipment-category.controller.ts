import { EquipmentCategoryService } from './equipment-category.service';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EquipmentCategoryCreateDTO } from './dto/equipmentCategoryCreate.dto';
import { EquipmentCategoryUpdateDTO } from './dto/equipmentCategoryUpdate.dto';

@Controller('equipment-category')
export class EquipmentCategoryController {
    constructor(private readonly EquipmentCategoryService: EquipmentCategoryService) { }

    @MessagePattern({ cmd: "assets_equipment-category_getAll" })
    @Get()
    async getEquipmentCategory(payload: { keyword: string; }) {
        return await this.EquipmentCategoryService.getEquipmentCategory(payload.keyword);
    }

    @MessagePattern({ cmd: "assets_equipment-category_getById" })
    @Get()
    async getEquipmentCategoryById(payload: { id: any; }) {
        return await this.EquipmentCategoryService.getEquipmentCategoryById(payload.id);
    }

    @MessagePattern({ cmd: "assets_equipment-category_create" })
    @Post()
    async createEquipmentCategory(payload: EquipmentCategoryCreateDTO) {
        return this.EquipmentCategoryService.createEquipmentCategory(payload);
    }

    @MessagePattern({ cmd: "assets_equipment-category_update" })
    @Patch()
    async updateEquipmentCategory(payload: EquipmentCategoryUpdateDTO) {
        return await this.EquipmentCategoryService.updateEquipmentCategory(payload);
    }

    @MessagePattern({ cmd: "assets_equipment-category_delete" })
    @Delete()
    async deleteEquipmentCategory(payload: { id: any; }) {
        return await this.EquipmentCategoryService.deleteEquipmentCategory(payload.id);
    }
}
