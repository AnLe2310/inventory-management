import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
dotenv.config();

@Module({
  imports: [
    ClientsModule.register([{
      name: "ASSETS_SERVICE",
      transport: Transport[process.env.ASSETS_TRANSPORT_TYPE],
      options: {
        host: process.env.ASSETS_SERVICE_HOST,
        port: parseInt(process.env.ASSETS_SERVICE_PORT),
      }
    }]),
    MongooseModule.forRoot(process.env.DATABASE),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
