import { EquipmentUsageHistoryResponseDTO } from './dto/equipmentUsageHistoryResponse.dto';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { EquipmentUsageHistoryCreateDTO } from './dto/equipmentUsageHistoryCreate.dto';
import { EquipmentUsageHistoryUpdateDTO } from './dto/equipmentUsageHistoryUpdate.dto';
import { ApiCustomResponse } from 'global/api.custom.response';

@ApiBearerAuth('access-token')
@Controller('equipment-usage-history')
export class EquipmentUsageHistoryController {
    constructor(@Inject('ASSETS_SERVICE') private readonly assetsClient: ClientProxy,) { }

    @ApiQuery({ name: 'keyword', required: false })
    @ApiCustomResponse({ model: EquipmentUsageHistoryResponseDTO, isArray: true })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin', 'Manager')
    @Get()
    getEquipmentUsageHistory(@Query('keyword') keyword: string) {
        return this.assetsClient.send({ cmd: "assets_equipment-usage-history_getAll" }, { keyword });
    }

    @ApiParam({ name: 'id', example: "673aba178fba41ff1c889693" })
    @ApiCustomResponse({ model: EquipmentUsageHistoryResponseDTO })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin', 'Manager')
    @Get(':id')
    getEquipmentUsageHistoryById(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: "assets_equipment-usage-history_getById" }, { id });
    }

    @ApiCustomResponse({ model: EquipmentUsageHistoryResponseDTO, statusCode: 201 })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin', 'Manager')
    @Post('create')
    createEquipmentUsageHistory(@Body(ValidationPipe) EquipmentUsageHistoryCreateDTO: EquipmentUsageHistoryCreateDTO) {
        return this.assetsClient.send({ cmd: "assets_equipment-usage-history_create" }, EquipmentUsageHistoryCreateDTO);
    }

    @ApiCustomResponse({ model: EquipmentUsageHistoryResponseDTO })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin', 'Manager')
    @Patch('update')
    updateEquipmentUsageHistory(@Body(ValidationPipe) EquipmentUsageHistoryUpdateDTO: EquipmentUsageHistoryUpdateDTO) {
        return this.assetsClient.send({ cmd: "assets_equipment-usage-history_update" }, EquipmentUsageHistoryUpdateDTO);
    }

    @ApiCustomResponse({ model: EquipmentUsageHistoryResponseDTO })
    @ApiParam({ name: 'id', example: "673aba178fba41ff1c889693" })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin', 'Manager')
    @Delete('delete/:id')
    deleteEquipmentUsageHistory(@Param("id") id: string) {
        return this.assetsClient.send({ cmd: "assets_equipment-usage-history_delete" }, { id });
    }
}
