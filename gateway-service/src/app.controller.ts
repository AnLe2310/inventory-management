import { Body, Controller, Get, Inject, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { UserCreateDto } from './dto/createUser.dto';
import { UserUpdateDto } from './dto/updateUser.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('ASSETS_SERVICE') private readonly assetsClient: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) { }

  @Get('user')
  async getUser() {
    return this.assetsClient.send({ cmd: 'assets_user_getAll' }, {});
  }

  @Get('user/:id')
  async getUserById(@Param('id') id: string) {
    return this.assetsClient.send({ cmd: 'assets_user_getById' }, { id: id });
  }

  @Post('user/create')
  async createUser(@Body(ValidationPipe) UserCreateDto: UserCreateDto) {
    return this.assetsClient.send({ cmd: 'assets_user_create' }, UserCreateDto);
  }

  @Patch('user/update')
  async updateUser(@Body(ValidationPipe) UserUpdateDto: UserUpdateDto) {
    return this.assetsClient.send({ cmd: 'assets_user_update' }, UserUpdateDto);
  }
}
