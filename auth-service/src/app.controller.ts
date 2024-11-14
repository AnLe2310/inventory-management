import { LoginDTO } from './dto/login.dto';
import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('login')
export class AppController {
  constructor(private readonly appService: AppService,) { }

  @MessagePattern({ cmd: "auth_login" })
  @Post()
  login(@Body(ValidationPipe) LoginDTO: LoginDTO) {
    return this.appService.login(LoginDTO);
  }
}

