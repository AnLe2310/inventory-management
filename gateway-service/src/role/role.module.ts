import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { ClientModule } from 'src/client.module';

@Module({
  imports: [ClientModule],
  controllers: [RoleController]
})
export class RoleModule {}
