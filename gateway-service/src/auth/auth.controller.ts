import { Body, Controller, Get, Inject, Param, Post, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDTO } from './dto/login.dto';
import { ApiParam } from '@nestjs/swagger';
import { ApiCustomResponse } from 'global/api.custom.response';
import { LoginResponseDTO } from './dto/loginResponse.dto';
import { RefreshTokenDTO } from './dto/refreshToken.dto';
import { UserResponseDTO } from 'src/user/dto/userResponse.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) { };

    @ApiCustomResponse({ model: LoginResponseDTO })
    @Post('login')
    login(@Body(ValidationPipe) LoginDTO: LoginDTO) {
        return this.authClient.send({ cmd: "auth_login" }, LoginDTO);
    }

    @ApiCustomResponse({ model: UserResponseDTO })
    @Post('register')
    register(@Body(ValidationPipe) RegisterDTO: RegisterDTO) {
        return this.authClient.send({ cmd: "auth_register" }, RegisterDTO);
    }

    @ApiCustomResponse({ model: UserResponseDTO })
    @ApiParam({ name: 'id', example: '673c0fcc069bb59a319065af' })
    @Get('active/:id')
    active(@Param('id') id: string) {
        return this.authClient.send({ cmd: "auth_active" }, { id });
    }

    @ApiParam({ name: 'refreshToken', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzU1ZmFjZTIwZjYxMGMyMWZiNTJmOCIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMxODQyMTg3LCJleHAiOjE3MzE4NDU3ODd9.-9v_AbIFsZfAfj4GSZAhyLNYX67tgtVH-xM2N_bCeKY' })
    @ApiCustomResponse({ model: RefreshTokenDTO })
    @Get(':refreshToken')
    refresh(@Param('refreshToken') refreshToken: string) {
        return this.authClient.send({ cmd: "auth_refresh" }, { refreshToken: refreshToken });
    }
}
