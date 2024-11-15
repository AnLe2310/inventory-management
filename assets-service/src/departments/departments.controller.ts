import { MessagePattern } from '@nestjs/microservices';
import { DepartmentsService } from './departments.service';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { Message, ResponseData, Status } from 'src/global/responseData';
import { DepartmentCreateDTO } from './dto/departmentCreate.dto';
import { DepartmentUpdateDTO } from './dto/departmentUpdate.dto';

@Controller('departments')
export class DepartmentsController {
    constructor(private readonly DepartmentsService: DepartmentsService) { }

    @MessagePattern({ cmd: "assets_department_getAll" })
    @Get()
    async getDepartment(): Promise<ResponseData<object>> {
        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, await this.DepartmentsService.getDepartment());
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }

    @MessagePattern({ cmd: "assets_department_getById" })
    @Get()
    async getDepartmentById(payload: { id: any; }): Promise<ResponseData<object>> {
        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, await this.DepartmentsService.getDepartmentById(payload.id));
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }

    @MessagePattern({ cmd: "assets_department_create" })
    @Post()
    async createDepartment(payload: DepartmentCreateDTO): Promise<ResponseData<object>> {
        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, this.DepartmentsService.createDepartment(payload));
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }

    @MessagePattern({ cmd: "assets_department_update" })
    @Patch()
    async updateDepartment(payload: DepartmentUpdateDTO): Promise<ResponseData<object>> {
        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, await this.DepartmentsService.updateDepartment(payload));
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }

    @MessagePattern({ cmd: "assets_department_delete" })
    @Delete()
    async deleteDepartment(payload: { id: any; }) {
        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, await this.DepartmentsService.deleteDepartment(payload.id));
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }
}
