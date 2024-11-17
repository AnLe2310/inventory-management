import { LoginDTO } from './dto/login.dto';
import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<User>,
    private readonly jwtService: JwtService,
    @Inject('ASSETS_SERVICE') private readonly assetsClient: ClientProxy,
  ) { }

  async login(LoginDTO: LoginDTO) {
    const user = await this.UserModel.findOne({
      $or: [{ username: LoginDTO.username }, { email: LoginDTO.username }], password: LoginDTO.password, isActive: true
    }).lean();

    if (!user) throw new NotFoundException("User not found or inactive");

    const role = await firstValueFrom(
      this.assetsClient.send({ cmd: "assets_role_getById" }, { id: user.roleId })
    );

    const payload = { id: user._id, name: user.username, email: user.email, role: role.name };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });

    await this.UserModel.updateOne({ _id: user._id }, { refreshToken });

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async refresh(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken);
    const user = await this.UserModel.findById(payload.id);

    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException("Refresh token is invalid or expired");
    }

    const newAccessToken = this.jwtService.sign({ id: user.id, name: user.username, email: user.email });
    return { access_token: newAccessToken };
  }
}

