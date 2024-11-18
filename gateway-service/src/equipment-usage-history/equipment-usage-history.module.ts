import { Module } from '@nestjs/common';
import { EquipmentUsageHistoryController } from './equipment-usage-history.controller';
import { ClientModule } from 'src/client.module';

@Module({
  imports: [ClientModule],
  controllers: [EquipmentUsageHistoryController]
})
export class EquipmentUsageHistoryModule {}
