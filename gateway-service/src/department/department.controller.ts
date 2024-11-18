import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { DepartmentUpdateDTO } from './dto/departmentUpdate.dto';
import { DepartmentCreateDTO } from './dto/departmentCreate.dto';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ApiCustomResponse } from 'global/api.custom.response';
import { DepartmentResponseDTO } from './dto/departmentResponse.dto';

@Controller('department')
@ApiBearerAuth('access-token')
export class DepartmentController {
    constructor(@Inject('ASSETS_SERVICE') private readonly assetsClient: ClientProxy,) { }

    @ApiCustomResponse({ model: DepartmentResponseDTO, isArray: true })
    @UseGuards(JwtAuthGuard)
    @Get()
    async getDepartment() {
        return this.assetsClient.send({ cmd: "assets_department_getAll" }, {});
    }

    @ApiParam({ name: 'id', example: '6736cb3bb9a808891d124fa0' })
    @ApiCustomResponse({ model: DepartmentResponseDTO })
    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getDepartmentById(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: "assets_department_getById" }, { id: id });
    }

    @ApiCustomResponse({ model: DepartmentResponseDTO, statusCode: 201 })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('create')
    @Roles('admin', 'manager')
    async createDepartment(@Body(ValidationPipe) DepartmentCreateDTO: DepartmentCreateDTO) {
        return this.assetsClient.send({ cmd: "assets_department_create" }, DepartmentCreateDTO);
    }

    @ApiCustomResponse({ model: DepartmentResponseDTO })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch('update')
    @Roles('admin', 'manager')
    async updateDepartment(@Body(ValidationPipe) DepartmentUpdateDTO: DepartmentUpdateDTO) {
        return this.assetsClient.send({ cmd: "assets_department_update" }, DepartmentUpdateDTO);
    }

    @ApiParam({ name: 'id', example: '6736cb3bb9a808891d124fa0' })
    @ApiCustomResponse({ model: DepartmentResponseDTO })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete/:id')
    @Roles('admin', 'manager')
    async deleteDepartment(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: "assets_department_delete" }, { id: id });
    }
}
