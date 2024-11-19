import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserUpdateDTO } from './dto/userUpdate.dto';
import { UserCreateDTO } from './dto/userCreate.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/role.guard';
import { UserResponseDTO } from './dto/userResponse.dto';
import { ApiCustomResponse } from 'global/api.custom.response';

@Controller('user')
@ApiBearerAuth('access-token')
export class UserController {
    constructor(@Inject('ASSETS_SERVICE') private readonly assetsClient: ClientProxy,) { }

    @ApiQuery({ name: "keyword", required: false })
    @ApiCustomResponse({ model: UserResponseDTO, isArray: true })
    @UseGuards(JwtAuthGuard)
    @Get()
    getUser(@Query('keyword') keyword: string) {
        return this.assetsClient.send({ cmd: 'assets_user_getAll' }, { keyword });
    }

    @ApiCustomResponse({ model: UserResponseDTO })
    @ApiParam({ name: 'id', example: '6736cb3bb9a808891d124fa0' })
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getUserById(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: 'assets_user_getById' }, { id });
    }

    @ApiCustomResponse({ model: UserResponseDTO, statusCode: 201 })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('create')
    @Roles('admin', 'manager')
    createUser(@Body(ValidationPipe) UserCreateDTO: UserCreateDTO) {
        return this.assetsClient.send({ cmd: 'assets_user_create' }, UserCreateDTO);
    }

    @ApiCustomResponse({ model: UserResponseDTO })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch('update')
    @Roles('admin', 'manager')
    updateUser(@Body(ValidationPipe) UserUpdateDTO: UserUpdateDTO) {
        return this.assetsClient.send({ cmd: 'assets_user_update' }, UserUpdateDTO);
    }

    @ApiCustomResponse({ model: UserResponseDTO })
    @ApiParam({ name: 'id', example: '6736cb3bb9a808891d124fa0' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete/:id')
    @Roles('admin', 'manager')
    deleteUser(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: 'assets_user_delete' }, { id });
    }
}

