import { Message, ResponseData, Status } from 'src/global/responseData';
import { UserService } from './user.service';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/createUser.dto';
import { UserUpdateDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
    constructor(private readonly UserService: UserService) { }

    @Get()
    async getUser(): Promise<ResponseData<object>> {
        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, await this.UserService.getUser());
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<ResponseData<object>> {
        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, await this.UserService.getUserById(id));
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }

    @Post('create')
    createUser(@Body() user: UserCreateDto): ResponseData<object> {
        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, this.UserService.createUser(user));
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }

    @Patch('update')
    async updateUser(@Body() user: UserUpdateDto): Promise<ResponseData<object>> {
        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, await this.UserService.updateUser(user));
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }

    @Patch('delete/:id')
    async deleteUser(@Param('id') id: string): Promise<ResponseData<object>> {
        try {
            return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, await this.UserService.deleteUser(id));
        } catch (e) {
            return new ResponseData<object>(Status.SERVER_ERROR, Message.SERVER_ERROR, e.message || e);
        }
    }
}
