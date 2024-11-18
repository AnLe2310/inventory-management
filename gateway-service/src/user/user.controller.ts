import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserUpdateDTO } from './dto/userUpdate.dto';
import { UserCreateDTO } from './dto/userCreate.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/role.guard';
import { UserResponseDTO } from './dto/userResponse.dto';
import { ApiCustomResponse } from 'global/api.custom.response';

@Controller('user')
@ApiBearerAuth('access-token')
export class UserController {
    constructor(@Inject('ASSETS_SERVICE') private readonly assetsClient: ClientProxy,) { }

    @UseGuards(JwtAuthGuard)
    @ApiCustomResponse({ model: UserResponseDTO, isArray: true })
    @Get()
    async getUser() {
        return this.assetsClient.send({ cmd: 'assets_user_getAll' }, {});
    }

    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id', example: '6736cb3bb9a808891d124fa0' })
    @ApiCustomResponse({ model: UserResponseDTO })
    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: 'assets_user_getById' }, { id: id });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiCustomResponse({ model: UserResponseDTO, statusCode: 201 })
    @Post('create')
    @Roles('admin', 'manager')
    async createUser(@Body(ValidationPipe) UserCreateDTO: UserCreateDTO) {
        return this.assetsClient.send({ cmd: 'assets_user_create' }, UserCreateDTO);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiCustomResponse({ model: UserResponseDTO })
    @Patch('update')
    @Roles('admin', 'manager')
    async updateUser(@Body(ValidationPipe) UserUpdateDTO: UserUpdateDTO) {
        return this.assetsClient.send({ cmd: 'assets_user_update' }, UserUpdateDTO);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiParam({ name: 'id', example: '6736cb3bb9a808891d124fa0' })
    @ApiCustomResponse({ model: UserResponseDTO })
    @Delete('delete/:id')
    @Roles('admin', 'manager')
    async deleteUser(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: 'assets_user_delete' }, { id: id });
    }
}

