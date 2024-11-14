import { LoginDTO } from './dto/login.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { Message, ResponseData, Status } from './global/responseData';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<User>,
    private readonly jwtService: JwtService
  ) { }

  async login(LoginDTO: LoginDTO) {
    const user = await this.UserModel.findOne({
      $or: [{ username: LoginDTO.username }, { email: LoginDTO.username }], password: LoginDTO.password
    });

    if (!user) return new ResponseData<object>(Status.NOT_FOUND, Message.NOT_FOUND, null);
    const payload = { id: user.id, name: user.username, email: user.email, };
    return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, { access_token: this.jwtService.sign(payload) });
  }
}

