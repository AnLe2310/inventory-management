import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { DepartmentController } from './department/department.controller';
import { EquipmentCategoryModule } from './equipment-category/equipment-category.module';
import { ClientModule } from './client.module';

@Module({
  imports: [
    ClientModule,
    EquipmentCategoryModule
  ],
  controllers: [AppController, UserController, AuthController, DepartmentController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
