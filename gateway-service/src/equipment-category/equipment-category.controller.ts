import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { EquipmentCategoryCreateDTO } from './dto/equipmentCategoryCreate.dto';
import { EquipmentCategoryUpdateDTO } from './dto/equipmentCategoryUpdate';
import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('equipment-category')
export class EquipmentCategoryController {
    constructor(@Inject('ASSETS_SERVICE') private readonly assetsClient: ClientProxy,) { }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        schema: {
            example: {
                statusCode: 200,
                message: 'Server Response Success',
                data: [{ _id: "67355face20f610c21fb52f8", name: "Laptop", description: "description for category", isActive: true, createdAt: "2024-11-14T02:25:48.131Z", updatedAt: "2024-11-14T09:03:26.980Z" }]
            }
        }
    })
    @Get()
    async getEquipmentCategory() {
        return this.assetsClient.send({ cmd: "assets_equipment-category_getAll" }, {});
    }

    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id', example: '6736cb3bb9a808891d124fa0' })
    @ApiResponse({
        schema: {
            example: {
                statusCode: 200,
                message: 'Server Response Success',
                data: { _id: "67355face20f610c21fb52f8", name: "Laptop", description: "description for category", isActive: true, createdAt: "2024-11-14T02:25:48.131Z", updatedAt: "2024-11-14T09:03:26.980Z" }
            }
        }
    })
    @Get(":id")
    async getEquipmentCategoryById(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: "assets_equipment-category_getById" }, { id: id });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({
        schema: {
            example: {
                statusCode: 200,
                message: 'Server Response Success',
                data: { name: "Laptop", description: "description for category", isActive: true, createdAt: "2024-11-14T02:25:48.131Z", updatedAt: "2024-11-14T09:03:26.980Z" }
            }
        }
    })
    @Post('create')
    @Roles('admin', 'manager')
    async createEquipmentCategory(@Body(ValidationPipe) EquipmentCategoryCreateDTO: EquipmentCategoryCreateDTO ) {
        return this.assetsClient.send({cmd: "assets_equipment-category_create"}, EquipmentCategoryCreateDTO)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({
        schema: {
            example: {
                statusCode: 200,
                message: 'Server Response Success',
                data: { _id: "67355face20f610c21fb52f8", name: "Laptop", description: "description for category", isActive: true, createdAt: "2024-11-14T02:25:48.131Z", updatedAt: "2024-11-14T09:03:26.980Z" }
            }
        }
    })
    @Patch('update')
    @Roles('admin', 'manager')
    async updateEquipmentCategory(@Body(ValidationPipe) EquipmentCategoryUpdateDTO: EquipmentCategoryUpdateDTO) {
        return this.assetsClient.send({cmd: "assets_equipment-category_update"}, EquipmentCategoryUpdateDTO)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiParam({ name: 'id', example: '6736cb3bb9a808891d124fa0' })
    @ApiResponse({
        schema: {
            example: {
                statusCode: 200,
                message: 'Server Response Success',
                data: { _id: "67355face20f610c21fb52f8", name: "Laptop", description: "description for category", isActive: true, createdAt: "2024-11-14T02:25:48.131Z", updatedAt: "2024-11-14T09:03:26.980Z" }
            }
        }
    })
    @Delete('delete:id')
    @Roles('admin', 'manager')
    async deleteEquipmentCategory(@Param('id') id: string) {
        return this.assetsClient.send({cmd: "assets_equipment-category_delete"}, {id: id})
    }
}
