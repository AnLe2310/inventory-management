import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { EquipmentReportCreateDTO } from './dto/equipmentReportCreate.dto';
import { EquipmentReportUpdateDTO } from './dto/equipmentReportUpdate.dto';
import { ApiCustomResponse } from 'global/api.custom.response';
import { EquipmentReportResponseDTO } from './dto/equipmentReportResponse.dto';

@Controller('equipment-report')
@ApiBearerAuth('access-token')
export class EquipmentReportController {
    constructor(@Inject('ASSETS_SERVICE') private readonly assetsClient: ClientProxy,) { }

    @ApiCustomResponse({ model: EquipmentReportResponseDTO, isArray: true })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager', 'employee')
    @Get()
    getEquipmentReport() {
        return this.assetsClient.send({ cmd: "assets_equipment-report_getAll" }, {});
    }

    @ApiParam({ name: 'id', example: '673aa12e3c7b8fa1eb138f09' })
    @ApiCustomResponse({ model: EquipmentReportResponseDTO })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager', 'employee')
    @Get(":id")
    getEquipmentReportId(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: "assets_equipment-report_getById" }, { id: id });
    }

    @ApiCustomResponse({ model: EquipmentReportResponseDTO, statusCode: 201 })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager', 'employee')
    @Post('create')
    createEquipmentReport(@Body(ValidationPipe) EquipmentReportCreateDTO: EquipmentReportCreateDTO) {
        return this.assetsClient.send({ cmd: "assets_equipment-report_create" }, EquipmentReportCreateDTO);
    }

    @ApiCustomResponse({ model: EquipmentReportResponseDTO })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager', 'employee')
    @Patch('update')
    updateEquipmentReport(@Body(ValidationPipe) EquipmentReportUpdateDTO: EquipmentReportUpdateDTO) {
        return this.assetsClient.send({ cmd: "assets_equipment-report_update" }, EquipmentReportUpdateDTO);
    }

    @ApiParam({ name: 'id', type: String, example: '673aa12e3c7b8fa1eb138f09' })
    @ApiCustomResponse({ model: EquipmentReportResponseDTO })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager', 'employee')
    @Delete('delete/:id')
    deleteEquipmentReport(@Param("id") id: string) {
        return this.assetsClient.send({ cmd: "assets_equipment-report_delete" }, { id: id });
    }
}
