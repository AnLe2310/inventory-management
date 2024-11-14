import { Body, Controller, Get, Inject, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,) { }
}
