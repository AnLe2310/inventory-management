import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { DepartmentUpdateDTO } from './dto/departmentUpdate.dto';
import { DepartmentCreateDTO } from './dto/departmentCreate.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('department')
@ApiBearerAuth('access-token')
export class DepartmentController {
    constructor(@Inject('ASSETS_SERVICE') private readonly assetsClient: ClientProxy,) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getDepartment() {
        return this.assetsClient.send({ cmd: "assets_department_getAll" }, {});
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getDepartmentById(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: "assets_department_getById" }, { id: id });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('create')
    @Roles('admin', 'manager')
    async createDepartment(@Body(ValidationPipe) DepartmentCreateDTO: DepartmentCreateDTO ) {
        return this.assetsClient.send({cmd: "assets_department_create"}, DepartmentCreateDTO)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch('update')
    @Roles('admin', 'manager')
    async updateDepartment(@Body(ValidationPipe) DepartmentUpdateDTO: DepartmentUpdateDTO) {
        return this.assetsClient.send({cmd: "assets_department_update"}, DepartmentUpdateDTO)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete:id')
    @Roles('admin', 'manager')
    async deleteDepartment(@Param('id') id: string) {
        return this.assetsClient.send({cmd: "assets_department_delete"}, {id: id})
    }
}
