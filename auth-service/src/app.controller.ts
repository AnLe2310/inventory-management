import { LoginDTO } from './dto/login.dto';
import { Body, Controller, Get, Post, Res, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,) { }

  @MessagePattern({ cmd: "auth_login" })
  @Post()
  async login(@Body(ValidationPipe) LoginDTO: LoginDTO) {
    return this.appService.login(LoginDTO);
  }

  @MessagePattern({ cmd: "auth_refresh" })
  @Get()
  async refresh(payload: { refreshToken: string; }) {
    return this.appService.refresh(payload.refreshToken );
  }
}

