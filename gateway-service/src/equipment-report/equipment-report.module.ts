import { Module } from '@nestjs/common';
import { EquipmentReportController } from './equipment-report.controller';
import { ClientModule } from 'src/client.module';

@Module({
  imports: [ClientModule],
  controllers: [EquipmentReportController]
})
export class EquipmentReportModule {}
