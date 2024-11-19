import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { ClientModule } from 'src/client.module';

@Module({
  imports: [ClientModule],
  controllers: [EmailController]
})
export class EmailModule {}
