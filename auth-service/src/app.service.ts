import { LoginDTO } from './dto/login.dto';
import { RefreshDTO } from './dto/Refresh.dto';
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
      $or: [{ username: LoginDTO.username }, { email: LoginDTO.username }], password: LoginDTO.password, isActive: true
    });

    if (!user) return new ResponseData<object>(Status.NOT_FOUND, Message.NOT_FOUND, null);
    const payload = { id: user.id, name: user.username, email: user.email, role: user.role };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });

    console.log('payload:', payload);

    return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, { access_token: accessToken, refresh_token: refreshToken });
  }

  async refresh(RefreshDTO: RefreshDTO) {
    const refresh_token = RefreshDTO.refreshToken;

    try {
      const payload = this.jwtService.verify(refresh_token);
      const user = await this.UserModel.findById(payload.id);

      if (!user || user.refreshToken !== refresh_token) {
        return new ResponseData<object>(Status.UNAUTHORIZED, Message.UNAUTHORIZED, null);
      }

      const newAccessToken = this.jwtService.sign({ id: user.id, name: user.username, email: user.email });
      return new ResponseData<object>(Status.SUCCESS, Message.SUCCESS, { access_token: newAccessToken });
    } catch (error) {
      return new ResponseData<object>(Status.UNAUTHORIZED, Message.UNAUTHORIZED, null);
    }
  }
}

