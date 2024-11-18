import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { EquipmentCreateDTO } from './dto/equipmentCreate.dto';
import { EquipmentUpdateDTO } from './dto/equipmentUpdate.dto';
import { Roles } from 'src/auth/roles.decorator';

@Controller('equipment')
@ApiBearerAuth('access-token')
export class EquipmentController {
    constructor(@Inject('ASSETS_SERVICE') private readonly assetsClient: ClientProxy,) { }

    @ApiResponse({
        schema: {
            example: {
                statusCode: 200,
                message: "Server Response Success",
                data: [{ _id: "6739f055d58a34a294ba6840", name: "Laptop", description: "The description equipment", categoryId: "6736f5d65dad13c26754b0d9", departmentId: "6736cb3bb9a808891d124fa0", specifications: {}, status: "Available", condition: "New", isActive: "true", createdAt: "2024-11-17T13:32:05.850Z", updatedAt: "2024-11-17T13:32:05.850Z" }]
            }
        }
    })
    @UseGuards(JwtAuthGuard)
    @Get()
    async getEquipment() {
        return this.assetsClient.send({ cmd: "assets_equipment_getAll" }, {});
    }

    @ApiQuery({ example: { id: "6739f055d58a34a294ba6840" } })
    @ApiResponse({
        schema: {
            example: {
                statusCode: 200,
                message: "Server Response Success",
                data: { _id: "6739f055d58a34a294ba6840", name: "Laptop", description: "The description equipment", categoryId: "6736f5d65dad13c26754b0d9", departmentId: "6736cb3bb9a808891d124fa0", specifications: {}, status: "Available", condition: "New", isActive: "true", createdAt: "2024-11-17T13:32:05.850Z", updatedAt: "2024-11-17T13:32:05.850Z" }
            }
        }
    })
    @UseGuards(JwtAuthGuard)
    @Get('id')
    async getEquipmentById(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: "assets_equipment_getById" }, { id: id });
    }

    @ApiResponse({
        schema: {
            example: {
                statusCode: 201,
                message: "Server Response Success",
                data: { _id: "6739f055d58a34a294ba6840", name: "Laptop", description: "The description equipment", categoryId: "6736f5d65dad13c26754b0d9", departmentId: "6736cb3bb9a808891d124fa0", specifications: {}, status: "Available", condition: "New", isActive: "true", createdAt: "2024-11-17T13:32:05.850Z", updatedAt: "2024-11-17T13:32:05.850Z" }
            }
        }
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager')
    @Post('create')
    async createEquipment(@Body(ValidationPipe) EquipmentCreateDTO: EquipmentCreateDTO) {
        return this.assetsClient.send({ cmd: "assets_equipment_create" }, EquipmentCreateDTO);
    }

    @ApiResponse({
        schema: {
            example: {
                statusCode: 200,
                message: "Server Response Success",
                data: { _id: "6739f055d58a34a294ba6840", name: "Laptop", description: "The description equipment", categoryId: "6736f5d65dad13c26754b0d9", departmentId: "6736cb3bb9a808891d124fa0", specifications: {}, status: "Available", condition: "New", isActive: "true", createdAt: "2024-11-17T13:32:05.850Z", updatedAt: "2024-11-17T13:32:05.850Z" }
            }
        }
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager')
    @Patch('update')
    async updateEquipment(@Body(ValidationPipe) EquipmentUpdateDTO: EquipmentUpdateDTO) {
        return this.assetsClient.send({ cmd: "assets_equipment_update" }, EquipmentUpdateDTO);
    }

    @ApiQuery({ example: { id: "6739f055d58a34a294ba6840" } })
    @ApiResponse({
        schema: {
            example: {
                statusCode: 200,
                message: "Server Response Success",
                data: { _id: "6739f055d58a34a294ba6840", name: "Laptop", description: "The description equipment", categoryId: "6736f5d65dad13c26754b0d9", departmentId: "6736cb3bb9a808891d124fa0", specifications: {}, status: "Available", condition: "New", isActive: "true", createdAt: "2024-11-17T13:32:05.850Z", updatedAt: "2024-11-17T13:32:05.850Z" }
            }
        }
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager')
    @Delete('delete/:id')
    async deleteEquipment(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: "assets_equipment_delete" }, { id: id });
    }
}
