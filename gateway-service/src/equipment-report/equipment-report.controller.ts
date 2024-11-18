import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { EquipmentReportCreateDTO } from './dto/equipmentReportCreate.dto';
import { EquipmentReportUpdateDTO } from './dto/equipmentReportUpdate.dto';

@Controller('equipment-report')
@ApiBearerAuth('access-token')
export class EquipmentReportController {
    constructor(@Inject('ASSETS_SERVICE') private readonly assetsClient: ClientProxy,) { }

    @ApiResponse({
        schema: {
            example: {
                statusCode: 200,
                message: "Server Response Success",
                data: [{ _id: "673aa12e3c7b8fa1eb138f09", equipmentId: "6739f055d58a34a294ba6840", userId: "67355face20f610c21fb52f8", departmentId: "6736cb3bb9a808891d124fa0", title: "The report's title", description: "The description report", status: "Pending", isActive: true, createdAt: "2024-11-18T02:06:38.013Z", updatedAt: "2024-11-18T02:06:38.013Z" }]
            }
        }
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager', 'employee')
    @Get()
    getEquipmentReport() {
        return this.assetsClient.send({ cmd: "assets_equipment-report_getAll" }, {});
    }

    @ApiParam({ name: 'id', example: '673aa12e3c7b8fa1eb138f09' })
    @ApiResponse({
        schema: {
            example: {
                statusCode: 200,
                message: "Server Response Success",
                data: { _id: "673aa12e3c7b8fa1eb138f09", equipmentId: "6739f055d58a34a294ba6840", userId: "67355face20f610c21fb52f8", departmentId: "6736cb3bb9a808891d124fa0", title: "The report's title", description: "The description report", status: "Pending", isActive: true, createdAt: "2024-11-18T02:06:38.013Z", updatedAt: "2024-11-18T02:06:38.013Z" }
            }
        }
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager', 'employee')
    @Get(":id")
    getEquipmentReportId(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: "assets_equipment-report_getById" }, { id: id });
    }

    @ApiResponse({
        schema: {
            example: {
                statusCode: 201,
                message: "Server Response Success",
                data: { _id: "673aa12e3c7b8fa1eb138f09", equipmentId: "6739f055d58a34a294ba6840", userId: "67355face20f610c21fb52f8", departmentId: "6736cb3bb9a808891d124fa0", title: "The report's title", description: "The description report", status: "Pending", isActive: true, createdAt: "2024-11-18T02:06:38.013Z", updatedAt: "2024-11-18T02:06:38.013Z" }
            }
        }
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager', 'employee')
    @Post('create')
    createEquipmentReport(@Body(ValidationPipe) EquipmentReportCreateDTO: EquipmentReportCreateDTO) {
        return this.assetsClient.send({ cmd: "assets_equipment-report_create" }, EquipmentReportCreateDTO);
    }

    @ApiResponse({
        schema: {
            example: {
                statusCode: 200,
                message: "Server Response Success",
                data: { _id: "673aa12e3c7b8fa1eb138f09", equipmentId: "6739f055d58a34a294ba6840", userId: "67355face20f610c21fb52f8", departmentId: "6736cb3bb9a808891d124fa0", title: "The report's title", description: "The description report", status: "Pending", isActive: true, createdAt: "2024-11-18T02:06:38.013Z", updatedAt: "2024-11-18T02:06:38.013Z" }
            }
        }
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager', 'employee')
    @Patch('update')
    updateEquipmentReport(@Body(ValidationPipe) EquipmentReportUpdateDTO: EquipmentReportUpdateDTO) {
        return this.assetsClient.send({ cmd: "assets_equipment-report_update" }, EquipmentReportUpdateDTO);
    }

    @ApiParam({ name: 'id', type: String, example: '673aa12e3c7b8fa1eb138f09' })
    @ApiResponse({
        schema: {
            example: {
                statusCode: 200,
                message: "Server Response Success",
                data: { _id: "673aa12e3c7b8fa1eb138f09", equipmentId: "6739f055d58a34a294ba6840", userId: "67355face20f610c21fb52f8", departmentId: "6736cb3bb9a808891d124fa0", title: "The report's title", description: "The description report", status: "Pending", isActive: true, createdAt: "2024-11-18T02:06:38.013Z", updatedAt: "2024-11-18T02:06:38.013Z" }
            }
        }
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'manager', 'employee')
    @Delete('delete')
    deleteEquipmentReport(@Param("id") id: string) {
        return this.assetsClient.send({ cmd: "assets_equipment-report_delete" }, { id: id });
    }
}
