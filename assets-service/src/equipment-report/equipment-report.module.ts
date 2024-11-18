import { Module } from '@nestjs/common';
import { EquipmentReportService } from './equipment-report.service';
import { EquipmentReportController } from './equipment-report.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EquipmentReportSchema } from './schemas/equipmentReport.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: "EquipmentReport", schema: EquipmentReportSchema}])],
  providers: [EquipmentReportService],
  controllers: [EquipmentReportController]
})
export class EquipmentReportModule {}
