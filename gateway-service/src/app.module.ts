import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { EquipmentCategoryModule } from './equipment-category/equipment-category.module';
import { ClientModule } from './client.module';
import { UserModule } from './user/user.module';
import { DepartmentModule } from './department/department.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { EquipmentModule } from './equipment/equipment.module';
import { EquipmentReportModule } from './equipment-report/equipment-report.module';
import { EquipmentUsageHistoryModule } from './equipment-usage-history/equipment-usage-history.module';

@Module({
  imports: [
    ClientModule,
    EquipmentCategoryModule,
    UserModule,
    DepartmentModule,
    AuthModule,
    RoleModule,
    EquipmentModule,
    EquipmentReportModule,
    EquipmentUsageHistoryModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
