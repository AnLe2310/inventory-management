import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { EquipmentCategoryCreateDTO } from './dto/equipmentCategoryCreate.dto';
import { EquipmentCategoryUpdateDTO } from './dto/equipmentCategoryUpdate';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('equipment-category')
export class EquipmentCategoryController {
    constructor(@Inject('ASSETS_SERVICE') private readonly assetsClient: ClientProxy,) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getEquipmentCategory() {
        return this.assetsClient.send({ cmd: "assets_equipment-category_getAll" }, {});
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getEquipmentCategoryById(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: "assets_equipment-category_getById" }, { id: id });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('create')
    @Roles('admin', 'manager')
    async createEquipmentCategory(@Body(ValidationPipe) EquipmentCategoryCreateDTO: EquipmentCategoryCreateDTO ) {
        return this.assetsClient.send({cmd: "assets_equipment-category_create"}, EquipmentCategoryCreateDTO)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch('update')
    @Roles('admin', 'manager')
    async updateEquipmentCategory(@Body(ValidationPipe) EquipmentCategoryUpdateDTO: EquipmentCategoryUpdateDTO) {
        return this.assetsClient.send({cmd: "assets_equipment-category_update"}, EquipmentCategoryUpdateDTO)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete:id')
    @Roles('admin', 'manager')
    async deleteEquipmentCategory(@Param('id') id: string) {
        return this.assetsClient.send({cmd: "assets_equipment-category_delete"}, {id: id})
    }
}
