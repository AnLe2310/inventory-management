import { Module } from '@nestjs/common';
import { ClientModule } from 'src/client.module';
import { AuthController } from './auth.controller';

@Module({
    imports: [ClientModule],
    controllers: [AuthController]
})
export class AuthModule {}
