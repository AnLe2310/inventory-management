import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { EquipmentCategoryCreateDTO } from './dto/equipmentCategoryCreate.dto';
import { EquipmentCategoryUpdateDTO } from './dto/equipmentCategoryUpdate';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ApiCustomResponse } from 'global/api.custom.response';
import { EquipmentCategoryResponseDTO } from './dto/equipmentCategoryResponse.dto';

@ApiBearerAuth('access-token')
@Controller('equipment-category')
export class EquipmentCategoryController {
    constructor(@Inject('ASSETS_SERVICE') private readonly assetsClient: ClientProxy,) { }

    @ApiQuery({ name: "keyword", required: false })
    @UseGuards(JwtAuthGuard)
    @ApiCustomResponse({ model: EquipmentCategoryResponseDTO, isArray: true })
    @Get()
    async getEquipmentCategory(@Query('keyword') keyword: string) {
        return this.assetsClient.send({ cmd: "assets_equipment-category_getAll" }, { keyword });
    }

    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id', example: '6736cb3bb9a808891d124fa0' })
    @ApiCustomResponse({ model: EquipmentCategoryResponseDTO })
    @Get(":id")
    async getEquipmentCategoryById(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: "assets_equipment-category_getById" }, { id });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiCustomResponse({ model: EquipmentCategoryResponseDTO, statusCode: 201 })
    @Post('create')
    @Roles('admin', 'manager')
    async createEquipmentCategory(@Body(ValidationPipe) EquipmentCategoryCreateDTO: EquipmentCategoryCreateDTO) {
        return this.assetsClient.send({ cmd: "assets_equipment-category_create" }, EquipmentCategoryCreateDTO);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiCustomResponse({ model: EquipmentCategoryResponseDTO })
    @Patch('update')
    @Roles('admin', 'manager')
    async updateEquipmentCategory(@Body(ValidationPipe) EquipmentCategoryUpdateDTO: EquipmentCategoryUpdateDTO) {
        return this.assetsClient.send({ cmd: "assets_equipment-category_update" }, EquipmentCategoryUpdateDTO);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiParam({ name: 'id', example: '6736cb3bb9a808891d124fa0' })
    @ApiCustomResponse({ model: EquipmentCategoryResponseDTO })
    @Delete('delete/:id')
    @Roles('admin', 'manager')
    async deleteEquipmentCategory(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: "assets_equipment-category_delete" }, { id });
    }
}
