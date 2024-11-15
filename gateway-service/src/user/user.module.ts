import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ClientModule } from 'src/client.module';

@Module({
    imports: [ClientModule],
    controllers: [UserController],
})
export class UserModule {}
