import { EquipmentCategoryService } from './equipment-category.service';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Message, ResponseData, Status } from 'src/global/responseData';
import { EquipmentCategoryCreateDTO } from './dto/equipmentCategoryCreate.dto';
import { EquipmentCategoryUpdateDTO } from './dto/equipmentCategoryUpdate.dto';

@Controller('equipment-category')
export class EquipmentCategoryController {
    constructor(private readonly EquipmentCategoryService: EquipmentCategoryService) { }

    @MessagePattern({ cmd: "assets_equipment-category_getAll" })
    @Get()
    async getEquipmentCategory(): Promise<ResponseData<object>> {
        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, await this.EquipmentCategoryService.getEquipmentCategory());
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }

    @MessagePattern({ cmd: "assets_equipment-category_getById" })
    @Get()
    async getEquipmentCategoryById(payload: { id: any; }): Promise<ResponseData<object>> {
        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, await this.EquipmentCategoryService.getEquipmentCategoryById(payload.id));
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }

    @MessagePattern({ cmd: "assets_equipment-category_create" })
    @Post()
    async createEquipmentCategory(payload: EquipmentCategoryCreateDTO): Promise<ResponseData<object>> {
        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, this.EquipmentCategoryService.createEquipmentCategory(payload));
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }

    @MessagePattern({ cmd: "assets_equipment-category_update" })
    @Patch()
    async updateEquipmentCategory(payload: EquipmentCategoryUpdateDTO): Promise<ResponseData<object>> {
        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, await this.EquipmentCategoryService.updateEquipmentCategory(payload));
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }

    @MessagePattern({ cmd: "assets_equipment-category_delete" })
    @Delete()
    async deleteEquipmentCategory(payload: { id: any; }) {
        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, await this.EquipmentCategoryService.deleteEquipmentCategory(payload.id));
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }
}
