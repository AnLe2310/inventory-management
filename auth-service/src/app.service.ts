import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { EmailSendDTO } from './dto/emailSend.dto';
import { firstValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<User>,
    private readonly jwtService: JwtService,
    @Inject('ASSETS_SERVICE') private readonly assetsClient: ClientProxy,
  ) { }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async comparePasswords(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async getHtmlTemplate(filePath: string, replacements: Record<string, string>) {
    const templatePath = path.join(__dirname, filePath);
    let template = fs.readFileSync(templatePath, 'utf-8');

    for (const [key, value] of Object.entries(replacements))
      template = template.replace(`{{${key}}}`, value);

    return template;
  }

  async login(loginDTO: any) {
    const { username, password } = loginDTO;

    const user = await this.UserModel.findOne({ $or: [{ username }, { email: username }], isActive: true, }).lean();

    if (!user) throw new NotFoundException("User not found or inactive");

    const isPasswordValid = await this.comparePasswords(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException("Invalid credentials");

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

  async register(payload: any) {
    const user = await firstValueFrom(this.assetsClient.send({ cmd: "assets_user_create" }, payload));

    if (!user) throw new Error('Register Failed');

    const htmlContent = await this.getHtmlTemplate('template/register.email.template.html', {
      actionLink: `http://localhost:3000/auth/active/${user._id}`
    });

    const mailOptions: EmailSendDTO = {
      to: user.email,
      subject: 'Activate your account',
      html: htmlContent
    };

    await firstValueFrom(this.assetsClient.send({ cmd: "assets_email_send" }, mailOptions));
    return null;
  }

  async active(id: string) {
    return await this.UserModel.findOneAndUpdate({ _id: id }, { isActive: true }, { new: true });
  }
}

