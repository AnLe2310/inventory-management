import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserUpdateDTO } from './dto/userUpdate.dto';
import { UserCreateDTO } from './dto/userCreate.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('user')
@ApiBearerAuth('access-token')
export class UserController {
    constructor(@Inject('ASSETS_SERVICE') private readonly assetsClient: ClientProxy,) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUser() {
        return this.assetsClient.send({ cmd: 'assets_user_getAll' }, {});
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: 'assets_user_getById' }, { id: id });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('create')
    @Roles('admin', 'manager')
    async createUser(@Body(ValidationPipe) UserCreateDTO: UserCreateDTO) {
        return this.assetsClient.send({ cmd: 'assets_user_create' }, UserCreateDTO);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch('update')
    @Roles('admin', 'manager')
    async updateUser(@Body(ValidationPipe) UserUpdateDTO: UserUpdateDTO) {
        return this.assetsClient.send({ cmd: 'assets_user_update' }, UserUpdateDTO);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete:id')
    @Roles('admin', 'manager')
    async deleteUser(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: 'assets_user_delete' }, { id: id });
    }
}

