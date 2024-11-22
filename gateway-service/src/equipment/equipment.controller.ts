import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { EquipmentCreateDTO } from './dto/equipmentCreate.dto';
import { EquipmentUpdateDTO } from './dto/equipmentUpdate.dto';
import { Roles } from 'src/auth/roles.decorator';
import { ApiCustomResponse } from 'global/api.custom.response';
import { EquipmentResponseDTO } from './dto/equipmentResponse.dto';

@Controller('equipment')
@ApiBearerAuth('access-token')
export class EquipmentController {
    constructor(@Inject('ASSETS_SERVICE') private readonly assetsClient: ClientProxy,) { }

    @ApiQuery({ name: 'keyword', required: false })
    @ApiCustomResponse({ model: EquipmentResponseDTO, isArray: true })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin', 'Manager', 'Employee')
    @Get()
    async getEquipment(@Query('keyword') keyword: string) {
        return this.assetsClient.send({ cmd: "assets_equipment_getAll" }, { keyword });
    }

    @ApiParam({ name: 'id', required: true, example: '6739f055d58a34a294ba6840' })
    @ApiCustomResponse({ model: EquipmentResponseDTO })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin', 'Manager', 'Employee')
    @Get(':id')
    async getEquipmentById(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: "assets_equipment_getById" }, { id });
    }

    @ApiCustomResponse({ model: EquipmentResponseDTO, statusCode: 201 })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin', 'Manager')
    @Post('create')
    async createEquipment(@Body(ValidationPipe) EquipmentCreateDTO: EquipmentCreateDTO) {
        return this.assetsClient.send({ cmd: "assets_equipment_create" }, EquipmentCreateDTO);
    }

    @ApiCustomResponse({ model: EquipmentResponseDTO })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin', 'Manager')
    @Patch('update')
    async updateEquipment(@Body(ValidationPipe) EquipmentUpdateDTO: EquipmentUpdateDTO) {
        return this.assetsClient.send({ cmd: "assets_equipment_update" }, EquipmentUpdateDTO);
    }

    @ApiQuery({ example: { id: "6739f055d58a34a294ba6840" } })
    @ApiCustomResponse({ model: EquipmentResponseDTO })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin', 'Manager')
    @Delete('delete/:id')
    async deleteEquipment(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: "assets_equipment_delete" }, { id });
    }
}
