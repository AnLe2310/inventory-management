import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { ClientModule } from 'src/client.module';

@Module({
  imports: [ClientModule],
  controllers: [EquipmentController]
})
export class EquipmentModule {}
