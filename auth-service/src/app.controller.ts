import { LoginDTO } from './dto/login.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { RegisterDTO } from './dto/register.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,) { }

  @MessagePattern({ cmd: "auth_login" })
  @Post()
  async login(payload: LoginDTO) {
    return this.appService.login(payload);
  }

  @MessagePattern({ cmd: "auth_register" })
  @Post()
  async register(payload: RegisterDTO) {
    return await this.appService.register(payload);
  }

  @MessagePattern({ cmd: "auth_active" })
  @Get()
  async active(payload: { id: string; }) {
    return this.appService.active(payload.id);
  }

  @MessagePattern({ cmd: "auth_refresh" })
  @Get()
  async refresh(payload: { refreshToken: string; }) {
    return this.appService.refresh(payload.refreshToken);
  }
}

