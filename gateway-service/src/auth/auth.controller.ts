import { Body, Controller, Get, Inject, Param, Post, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDTO } from './dto/login.dto';
import { ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) { };

    @ApiResponse({
        schema: {
            example: {
                statusCode: 200,
                message: 'Server Response Success',
                data: {
                    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzU1ZmFjZTIwZjYxMGMyMWZiNTJmOCIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMxODQyMTg3LCJleHAiOjE3MzE4NDU3ODd9.-9v_AbIFsZfAfj4GSZAhyLNYX67tgtVH-xM2N_bCeKY',
                    refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzU1ZmFjZTIwZjYxMGMyMWZiNTJmOCIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMxODQyMTg3LCJleHAiOjE3MzE4NDU3ODd9.-9v_AbIFsZfAfj4GSZAhyLNYX67tgtVH-xM2N_bCeKY'
                }
            }
        }
    })
    @Post('login')
    login(@Body(ValidationPipe) LoginDTO: LoginDTO) {
        return this.authClient.send({ cmd: "auth_login" }, LoginDTO);
    }

    @ApiParam({ name: 'refreshToken', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzU1ZmFjZTIwZjYxMGMyMWZiNTJmOCIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMxODQyMTg3LCJleHAiOjE3MzE4NDU3ODd9.-9v_AbIFsZfAfj4GSZAhyLNYX67tgtVH-xM2N_bCeKY' })
    @ApiResponse({
        schema: {
            example: {
                statusCode: 200,
                message: 'Server Response Success',
                data: { accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzU1ZmFjZTIwZjYxMGMyMWZiNTJmOCIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMxODQyMTg3LCJleHAiOjE3MzE4NDU3ODd9.-9v_AbIFsZfAfj4GSZAhyLNYX67tgtVH-xM2N_bCeKY', }
            }
        }
    })
    @Get(':refreshToken')
    refresh(@Param('refreshToken') refreshToken: string) {
        return this.authClient.send({ cmd: "auth_refresh" }, { refreshToken: refreshToken });
    }
}
