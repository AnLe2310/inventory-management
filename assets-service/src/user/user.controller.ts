import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/createUser.dto';
import { UserUpdateDto } from './dto/updateUser.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('user')
export class UserController {
    constructor(private readonly UserService: UserService) { }

    @MessagePattern({ cmd: "assets_user_getAll" })
    @Get()
    async getUser(payload: { keyword: string; }) {
        return await this.UserService.getUser(payload.keyword);
    }

    @MessagePattern({ cmd: "assets_user_getById" })
    @Get()
    async getUserById(payload: { id: string; }) {
        return await this.UserService.getUserById(payload.id);
    }

    @MessagePattern({ cmd: "assets_user_create" })
    @Post()
    createUser(payload: UserCreateDto) {
        return this.UserService.createUser(payload);
    }

    @MessagePattern({ cmd: "assets_user_update" })
    @Patch()
    async updateUser(payload: UserUpdateDto) {
        return await this.UserService.updateUser(payload);
    }

    @MessagePattern({ cmd: "assets_user_delete" })
    @Delete()
    async deleteUser(payload: { id: string; }) {
        return await this.UserService.deleteUser(payload.id);
    }
}
