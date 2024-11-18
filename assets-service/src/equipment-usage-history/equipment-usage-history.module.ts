import { Module } from '@nestjs/common';
import { EquipmentUsageHistoryController } from './equipment-usage-history.controller';
import { EquipmentUsageHistoryService } from './equipment-usage-history.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EquipmentUsageHistorySchema } from './schemas/equipmentUsageHistory.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'EquipmentUsageHistory', schema: EquipmentUsageHistorySchema }])],
  controllers: [EquipmentUsageHistoryController],
  providers: [EquipmentUsageHistoryService]
})
export class EquipmentUsageHistoryModule { }
