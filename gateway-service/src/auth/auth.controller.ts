import { Body, Controller, Inject, Post, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDTO } from './dto/login.dto';
import { RefreshDTO } from './dto/Refresh.dto';

@Controller('auth')
export class AuthController {
    constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) { };

    @Post('login')
    login(@Body(ValidationPipe) LoginDTO: LoginDTO) {
        return this.authClient.send({ cmd: "auth_login" }, LoginDTO);
    }

    @Post('refresh')
    refresh(@Body(ValidationPipe) RefreshDTO: RefreshDTO) {
        return this.authClient.send({ cmd: "auth_refresh" }, RefreshDTO);
    }
}
