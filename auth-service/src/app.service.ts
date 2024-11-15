import { LoginDTO } from './dto/login.dto';
import { RefreshDTO } from './dto/Refresh.dto';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';

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

    if (!user) throw new NotFoundException("User not found or inactive");
    const payload = { id: user.id, name: user.username, email: user.email, role: user.role };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async refresh(RefreshDTO: RefreshDTO) {
    const refresh_token = RefreshDTO.refreshToken;

    const payload = this.jwtService.verify(refresh_token);
    const user = await this.UserModel.findById(payload.id);

    if (!user || user.refreshToken !== refresh_token) {
      throw new UnauthorizedException("Refresh token is invalid or expired");
    }

    const newAccessToken = this.jwtService.sign({ id: user.id, name: user.username, email: user.email });
    return { access_token: newAccessToken };
  }
}

