import { Message, ResponseData, Status } from 'src/global/responseData';
import { CategoryService } from './category.service';
import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CategoryCreateDTO } from './dto/categoryCreate.dto';
import { CategoryUpdateDTO } from './dto/categoryUpdate.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly CategoryService: CategoryService) { }

    @MessagePattern({ cmd: "assets_category_getAll" })
    @Get()
    async getCategory(): Promise<ResponseData<object>> {
        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, await this.CategoryService.getCategory());
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }

    @MessagePattern({ cmd: "assets_category_getById" })
    @Get()
    async getCategoryById(payload: { id: any; }): Promise<ResponseData<object>> {
        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, await this.CategoryService.getCategoryById(payload.id));
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }

    @MessagePattern({ cmd: "assets_category_create" })
    @Post()
    async createCategory(payload: CategoryCreateDTO): Promise<ResponseData<object>> {
        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, this.CategoryService.createCategory(payload));
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }

    @MessagePattern({ cmd: "assets_category_update" })
    @Patch()
    async updateCategory(payload: CategoryUpdateDTO): Promise<ResponseData<object>> {
        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, await this.CategoryService.updateCategory(payload));
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }

    @MessagePattern({ cmd: "assets_category_delete" })
    @Delete()
    async deleteCategory(payload: { id: any; }) {
        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, await this.CategoryService.deleteCategory(payload.id));
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }
}
