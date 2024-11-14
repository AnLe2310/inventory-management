import { Body, Controller, Get, Inject, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserUpdateDto } from './dto/updateUser.dto';
import { UserCreateDto } from './dto/createUser.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
@ApiBearerAuth('access-token')
export class UserController {
    constructor(@Inject('ASSETS_SERVICE') private readonly assetsClient: ClientProxy,) { }

    @UseGuards(JwtAuthGuard)
    @Get('user')
    async getUser() {
        return this.assetsClient.send({ cmd: 'assets_user_getAll' }, {});
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: 'assets_user_getById' }, { id: id });
    }

    @Post('create')
    async createUser(@Body(ValidationPipe) UserCreateDto: UserCreateDto) {
        return this.assetsClient.send({ cmd: 'assets_user_create' }, UserCreateDto);
    }

    @Patch('update')
    async updateUser(@Body(ValidationPipe) UserUpdateDto: UserUpdateDto) {
        return this.assetsClient.send({ cmd: 'assets_user_update' }, UserUpdateDto);
    }

    @Patch('delete:id')
    async deleteUser(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: 'assets_user_delete' }, { id: id });
    }
}

