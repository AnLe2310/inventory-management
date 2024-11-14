import { Message, ResponseData, Status } from 'src/global/responseData';
import { UserService } from './user.service';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/createUser.dto';
import { UserUpdateDto } from './dto/updateUser.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('user')
export class UserController {
    constructor(private readonly UserService: UserService) { }

    @MessagePattern({ cmd: "assets_user_getAll" })
    @Get()
    async getUser(): Promise<ResponseData<object>> {
        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, await this.UserService.getUser());
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }

    @MessagePattern({ cmd: "assets_user_getById" })
    @Get(':id')
    async getUserById(payload: { id: string; }): Promise<ResponseData<object>> {
        const { id } = payload;

        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, await this.UserService.getUserById(id));
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }

    @MessagePattern({ cmd: "assets_user_create" })
    @Post('create')
    createUser(payload: UserCreateDto): ResponseData<object> {
        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, this.UserService.createUser(payload));
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }

    @MessagePattern({ cmd: "assets_user_update" })
    @Patch('update')
    async updateUser(payload: UserUpdateDto): Promise<ResponseData<object>> {
        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, await this.UserService.updateUser(payload));
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }

    @Patch('delete/:id')
    async deleteUser(payload: { id: string; }): Promise<ResponseData<object>> {
        const { id } = payload;

        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, await this.UserService.deleteUser(id));
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }
}
