import { Body, Controller, Get, Inject, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserUpdateDto } from './dto/updateUser.dto';
import { UserCreateDto } from './dto/createUser.dto';
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
    async createUser(@Body(ValidationPipe) UserCreateDto: UserCreateDto) {
        return this.assetsClient.send({ cmd: 'assets_user_create' }, UserCreateDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch('update')
    @Roles('admin', 'manager')
    async updateUser(@Body(ValidationPipe) UserUpdateDto: UserUpdateDto) {
        return this.assetsClient.send({ cmd: 'assets_user_update' }, UserUpdateDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch('delete:id')
    @Roles('admin', 'manager')
    async deleteUser(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: 'assets_user_delete' }, { id: id });
    }
}

