import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { DepartmentController } from './department/department.controller';
import { EquipmentCategoryModule } from './equipment-category/equipment-category.module';
import { ClientModule } from './client.module';
import { UserModule } from './user/user.module';
import { DepartmentModule } from './department/department.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    ClientModule,
    EquipmentCategoryModule,
    UserModule,
    DepartmentModule,
    AuthModule,
    RoleModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
