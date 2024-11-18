import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RoleCreateDTO } from './dto/roleCreate.dto';
import { RoleUpdateDTO } from './dto/roleUpdate.dto';
import { ApiCustomResponse } from 'global/api.custom.response';
import { RoleResponseDTO } from './dto/roleResponse.dto';

@Controller('role')
@ApiBearerAuth('access-token')
export class RoleController {
    constructor(@Inject('ASSETS_SERVICE') private readonly assetsClient: ClientProxy,) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiCustomResponse({ model: RoleResponseDTO, isArray: true })
    @Get()
    async getRole() {
        return this.assetsClient.send({ cmd: "assets_role_getAll" }, {});
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiParam({ name: 'id', example: '6736cb3bb9a808891d124fa0' })
    @ApiCustomResponse({ model: RoleResponseDTO })
    @Get(":id")
    async getRoleById(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: "assets_role_getById" }, { id: id });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiCustomResponse({ model: RoleResponseDTO, statusCode: 201 })
    @Post('create')
    async createRole(@Body(ValidationPipe) RoleCreateDTO: RoleCreateDTO) {
        return this.assetsClient.send({ cmd: "assets_role_create" }, RoleCreateDTO);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiCustomResponse({ model: RoleResponseDTO })
    @Patch('update')
    async updateRole(@Body(ValidationPipe) RoleUpdateDTO: RoleUpdateDTO) {
        return this.assetsClient.send({ cmd: "assets_role_update" }, RoleUpdateDTO);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiParam({ name: 'id', example: '6736cb3bb9a808891d124fa0' })
    @ApiCustomResponse({ model: RoleResponseDTO })
    @Delete('delete/:id')
    async deleteRole(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: "assets_role_delete" }, { id: id });
    }
}
