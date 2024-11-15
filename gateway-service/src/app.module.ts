import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { CategoryController } from './category/category.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ASSETS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002,
        },
      },
    ])
  ],
  controllers: [AppController, UserController, AuthController, CategoryController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
