import { Module } from '@nestjs/common';
import { ClientModule } from 'src/client.module';
import { DepartmentController } from './department.controller';

@Module({
    imports: [ClientModule],
    controllers: [DepartmentController],
})
export class DepartmentModule {}
