import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserUpdateDTO } from './dto/userUpdate.dto';
import { UserCreateDTO } from './dto/userCreate.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('user')
@ApiBearerAuth('access-token')
export class UserController {
    constructor(@Inject('ASSETS_SERVICE') private readonly assetsClient: ClientProxy,) { }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        schema: {
            example: {
                statusCode: 200,
                message: 'Server Response Success',
                data: [{ _id: "67355face20f610c21fb52f8", username: "user", email: "user@gmail.com", password: "123", role: "employee", isActive: true, createdAt: "2024-11-14T02:25:48.131Z", updatedAt: "2024-11-14T09:03:26.980Z" }]
            }
        }
    })
    @Get()
    async getUser() {
        return this.assetsClient.send({ cmd: 'assets_user_getAll' }, {});
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        schema: {
            example: {
                statusCode: 200,
                message: 'Server Response Success',
                data: { _id: "67355face20f610c21fb52f8", username: "user", email: "user@gmail.com", password: "123", role: "employee", isActive: true, createdAt: "2024-11-14T02:25:48.131Z", updatedAt: "2024-11-14T09:03:26.980Z" }
            }
        }
    })
    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: 'assets_user_getById' }, { id: id });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({
        schema: {
            example: {
                statusCode: 201,
                message: 'Server Response Success',
                data: { username: "user", email: "user@gmail.com", password: "123", role: "manager", isActive: true, createdAt: "2024-11-14T02:25:48.131Z", updatedAt: "2024-11-14T09:03:26.980Z" }
            }
        }
    })
    @Post('create')
    @Roles('admin', 'manager')
    async createUser(@Body(ValidationPipe) UserCreateDTO: UserCreateDTO) {
        return this.assetsClient.send({ cmd: 'assets_user_create' }, UserCreateDTO);
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({
        schema: {
            example: {
                statusCode: 200,
                message: 'Server Response Success',
                data: { _id: "67355face20f610c21fb52f8", username: "user", email: "user@gmail.com", password: "123", role: "manager", isActive: true, createdAt: "2024-11-14T02:25:48.131Z", updatedAt: "2024-11-14T09:03:26.980Z" }
            }
        }
    })
    @Patch('update')
    @Roles('admin', 'manager')
    async updateUser(@Body(ValidationPipe) UserUpdateDTO: UserUpdateDTO) {
        return this.assetsClient.send({ cmd: 'assets_user_update' }, UserUpdateDTO);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({
        schema: {
            example: {
                statusCode: 200,
                message: 'Server Response Success',
                data: { _id: "67355face20f610c21fb52f8", username: "user", email: "user@gmail.com", password: "123", role: "manager", isActive: true, createdAt: "2024-11-14T02:25:48.131Z", updatedAt: "2024-11-14T09:03:26.980Z" }
            }
        }
    })
    @Delete('delete:id')
    @Roles('admin', 'manager')
    async deleteUser(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: 'assets_user_delete' }, { id: id });
    }
}

