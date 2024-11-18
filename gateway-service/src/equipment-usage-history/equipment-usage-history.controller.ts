import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { EquipmentUsageHistoryCreateDTO } from './dto/equipmentUsageHistoryCreate.dto';
import { EquipmentUsageHistoryUpdateDTO } from './dto/equipmentUsageHistoryUpdate.dto';

@ApiBearerAuth('access-token')
@Controller('equipment-usage-history')
export class EquipmentUsageHistoryController {
    constructor(@Inject('ASSETS_SERVICE') private readonly assetsClient: ClientProxy,) { }

    @ApiResponse({
        example: {
            statusCode: 200,
            message: "Server Response Success",
            data: [{ _id: "673aba178fba41ff1c889693", date: { start: "2024-11-18T03:50:44.373Z", end: "2024-11-18T03:50:44.373Z" }, condition: { before: "New" }, equipmentId: "6739f055d58a34a294ba6840", userId: "67355face20f610c21fb52f8", isActive: true, createdAt: "2024-11-18T03:52:55.820Z", updatedAt: "2024-11-18T03:52:55.820Z", }]
        }
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager')
    @Get()
    getEquipmentUsageHistory() {
        return this.assetsClient.send({ cmd: "assets_equipment-usage-history_getAll" }, {});
    }

    @ApiParam({ name: 'id', example: "673aba178fba41ff1c889693" })
    @ApiResponse({
        example: {
            statusCode: 200,
            message: "Server Response Success",
            data: { _id: "673aba178fba41ff1c889693", date: { start: "2024-11-18T03:50:44.373Z", end: "2024-11-18T03:50:44.373Z" }, condition: { before: "New" }, equipmentId: "6739f055d58a34a294ba6840", userId: "67355face20f610c21fb52f8", isActive: true, createdAt: "2024-11-18T03:52:55.820Z", updatedAt: "2024-11-18T03:52:55.820Z", }
        }
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager')
    @Get(':id')
    getEquipmentUsageHistoryById(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: "assets_equipment-usage-history_getById" }, { id });
    }

    @ApiResponse({
        example: {
            statusCode: 201,
            message: "Server Response Success",
            data: { _id: "673aba178fba41ff1c889693", date: { start: "2024-11-18T03:50:44.373Z", end: "2024-11-18T03:50:44.373Z" }, condition: { before: "New" }, equipmentId: "6739f055d58a34a294ba6840", userId: "67355face20f610c21fb52f8", isActive: true, createdAt: "2024-11-18T03:52:55.820Z", updatedAt: "2024-11-18T03:52:55.820Z", }
        }
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager')
    @Post('create')
    createEquipmentUsageHistory(@Body(ValidationPipe) EquipmentUsageHistoryCreateDTO: EquipmentUsageHistoryCreateDTO) {
        return this.assetsClient.send({ cmd: "assets_equipment-usage-history_create" }, EquipmentUsageHistoryCreateDTO);
    }

    @ApiResponse({
        example: {
            statusCode: 200,
            message: "Server Response Success",
            data: { _id: "673aba178fba41ff1c889693", date: { start: "2024-11-18T03:50:44.373Z", end: "2024-11-18T03:50:44.373Z" }, condition: { before: "New" }, equipmentId: "6739f055d58a34a294ba6840", userId: "67355face20f610c21fb52f8", isActive: true, createdAt: "2024-11-18T03:52:55.820Z", updatedAt: "2024-11-18T03:52:55.820Z", }
        }
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager')
    @Patch('update')
    updateEquipmentUsageHistory(@Body(ValidationPipe) EquipmentUsageHistoryUpdateDTO: EquipmentUsageHistoryUpdateDTO) {
        return this.assetsClient.send({ cmd: "assets_equipment-usage-history_update" }, EquipmentUsageHistoryUpdateDTO);
    }

    @ApiResponse({
        example: {
            statusCode: 200,
            message: "Server Response Success",
            data: { _id: "673aba178fba41ff1c889693", date: { start: "2024-11-18T03:50:44.373Z", end: "2024-11-18T03:50:44.373Z" }, condition: { before: "New" }, equipmentId: "6739f055d58a34a294ba6840", userId: "67355face20f610c21fb52f8", isActive: true, createdAt: "2024-11-18T03:52:55.820Z", updatedAt: "2024-11-18T03:52:55.820Z", }
        }
    })
    @ApiParam({ name: 'id', example: "673aba178fba41ff1c889693" })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager')
    @Delete('delete/:id')
    deleteEquipmentUsageHistory(@Param("id") id: string) {
        return this.assetsClient.send({ cmd: "assets_equipment-usage-history_delete" }, { id });
    }
}
