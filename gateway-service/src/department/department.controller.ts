import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { DepartmentUpdateDTO } from './dto/departmentUpdate.dto';
import { DepartmentCreateDTO } from './dto/departmentCreate.dto';
import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('department')
@ApiBearerAuth('access-token')
export class DepartmentController {
    constructor(@Inject('ASSETS_SERVICE') private readonly assetsClient: ClientProxy,) { }

    @ApiResponse({
        schema: {
            example: {
                statusCode: 200,
                message: 'Server Response Success',
                data: [{ _id: "6736cb3bb9a808891d124fa0", name: "Phòng Họp", description: "Mô tả phòng họp", isActive: true, createdAt: "2024-11-15T04:16:59.587Z", updatedAt: "2024-11-15T04:18:35.835Z", }]
            }
        }
    })
    @UseGuards(JwtAuthGuard)
    @Get()
    async getDepartment() {
        return this.assetsClient.send({ cmd: "assets_department_getAll" }, {});
    }

    @ApiParam({ name: 'id', example: '6736cb3bb9a808891d124fa0' })
    @ApiResponse({
        schema: {
            example: {
                statusCode: 200,
                message: 'Server Response Success',
                data: { _id: "6736cb3bb9a808891d124fa0", name: "Phòng Họp", description: "Mô tả phòng họp", isActive: true, createdAt: "2024-11-15T04:16:59.587Z", updatedAt: "2024-11-15T04:18:35.835Z", }
            }
        }
    })
    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getDepartmentById(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: "assets_department_getById" }, { id: id });
    }

    @ApiResponse({
        schema: {
            example: {
                statusCode: 201,
                message: 'Server Response Success',
                data: { _id: "6736cb3bb9a808891d124fa0", name: "Phòng Họp", description: "Mô tả phòng họp", isActive: true, createdAt: "2024-11-15T04:16:59.587Z", updatedAt: "2024-11-15T04:18:35.835Z", }
            }
        }
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('create')
    @Roles('admin', 'manager')
    async createDepartment(@Body(ValidationPipe) DepartmentCreateDTO: DepartmentCreateDTO) {
        return this.assetsClient.send({ cmd: "assets_department_create" }, DepartmentCreateDTO);
    }

    @ApiResponse({
        schema: {
            example: {
                statusCode: 200,
                message: 'Server Response Success',
                data: { _id: "6736cb3bb9a808891d124fa0", name: "Phòng Họp", description: "Mô tả phòng họp", isActive: true, createdAt: "2024-11-15T04:16:59.587Z", updatedAt: "2024-11-15T04:18:35.835Z", }
            }
        }
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch('update')
    @Roles('admin', 'manager')
    async updateDepartment(@Body(ValidationPipe) DepartmentUpdateDTO: DepartmentUpdateDTO) {
        return this.assetsClient.send({ cmd: "assets_department_update" }, DepartmentUpdateDTO);
    }

    @ApiParam({ name: 'id', example: '6736cb3bb9a808891d124fa0' })
    @ApiResponse({
        schema: {
            example: {
                statusCode: 200,
                message: 'Server Response Success',
                data: { _id: "6736cb3bb9a808891d124fa0", name: "Phòng Họp", description: "Mô tả phòng họp", isActive: true, createdAt: "2024-11-15T04:16:59.587Z", updatedAt: "2024-11-15T04:18:35.835Z", }
            }
        }
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete/:id')
    @Roles('admin', 'manager')
    async deleteDepartment(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: "assets_department_delete" }, { id: id });
    }
}
