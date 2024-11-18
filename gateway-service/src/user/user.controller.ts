import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserUpdateDTO } from './dto/userUpdate.dto';
import { UserCreateDTO } from './dto/userCreate.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiParam, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/role.guard';
import { CustomResponseDTO } from '../../global/dto/customResponse.dto';
import { UserResponseDTO } from './dto/userResponse.dto';


class UserListResponse extends CustomResponseDTO<UserResponseDTO[]> {
    @ApiProperty({ type: [UserResponseDTO] })
    data: UserResponseDTO[];
}

class UserDetailResponse extends CustomResponseDTO<UserResponseDTO> {
    @ApiProperty({ type: UserResponseDTO })
    data: UserResponseDTO;
}

@Controller('user')
@ApiBearerAuth('access-token')
export class UserController {
    constructor(@Inject('ASSETS_SERVICE') private readonly assetsClient: ClientProxy,) { }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({ type: UserListResponse })
    @Get()
    async getUser() {
        return this.assetsClient.send({ cmd: 'assets_user_getAll' }, {});
    }

    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id', example: '6736cb3bb9a808891d124fa0' })
    @ApiResponse({ type: UserDetailResponse })
    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: 'assets_user_getById' }, { id: id });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({ type: UserDetailResponse })
    @Post('create')
    @Roles('admin', 'manager')
    async createUser(@Body(ValidationPipe) UserCreateDTO: UserCreateDTO) {
        return this.assetsClient.send({ cmd: 'assets_user_create' }, UserCreateDTO);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({ type: UserDetailResponse })
    @Patch('update')
    @Roles('admin', 'manager')
    async updateUser(@Body(ValidationPipe) UserUpdateDTO: UserUpdateDTO) {
        return this.assetsClient.send({ cmd: 'assets_user_update' }, UserUpdateDTO);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiParam({ name: 'id', example: '6736cb3bb9a808891d124fa0' })
    @ApiResponse({ type: UserDetailResponse })
    @Delete('delete/:id')
    @Roles('admin', 'manager')
    async deleteUser(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: 'assets_user_delete' }, { id: id });
    }
}

