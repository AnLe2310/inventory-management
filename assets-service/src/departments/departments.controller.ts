import { MessagePattern } from '@nestjs/microservices';
import { DepartmentsService } from './departments.service';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { DepartmentCreateDTO } from './dto/departmentCreate.dto';
import { DepartmentUpdateDTO } from './dto/departmentUpdate.dto';

@Controller('departments')
export class DepartmentsController {
    constructor(private readonly DepartmentsService: DepartmentsService) { }

    @MessagePattern({ cmd: "assets_department_getAll" })
    @Get()
    async getDepartment() {
        return await this.DepartmentsService.getDepartment();
    }

    @MessagePattern({ cmd: "assets_department_getById" })
    @Get()
    async getDepartmentById(payload: { id: any; }) {
        return await this.DepartmentsService.getDepartmentById(payload.id);
    }

    @MessagePattern({ cmd: "assets_department_create" })
    @Post()
    async createDepartment(payload: DepartmentCreateDTO) {
        return this.DepartmentsService.createDepartment(payload);
    }

    @MessagePattern({ cmd: "assets_department_update" })
    @Patch()
    async updateDepartment(payload: DepartmentUpdateDTO) {
        return await this.DepartmentsService.updateDepartment(payload);
    }

    @MessagePattern({ cmd: "assets_department_delete" })
    @Delete()
    async deleteDepartment(payload: { id: any; }) {
        return await this.DepartmentsService.deleteDepartment(payload.id);
    }
}
