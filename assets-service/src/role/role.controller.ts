import { MessagePattern } from '@nestjs/microservices';
import { RoleService } from './role.service';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { RoleCreateDTO } from './dto/roleCreate.dto';
import { RoleUpdateDTO } from './dto/roleUpdate.dto';

@Controller('role')
export class RoleController {
    constructor(private readonly RoleService: RoleService) { }

    @MessagePattern({ cmd: "assets_role_getAll" })
    @Get()
    async getRole() {
        return await this.RoleService.getRole();
    }

    @MessagePattern({ cmd: "assets_role_getById" })
    @Get()
    async getRoleById(payload: { id: string; }) {
        return await this.RoleService.getRoleById(payload.id);
    }

    @MessagePattern({ cmd: "assets_role_create" })
    @Post()
    async createRole(payload: RoleCreateDTO) {
        return this.RoleService.createRole(payload);
    }

    @MessagePattern({ cmd: "assets_role_update" })
    @Patch()
    async updateRole(payload: RoleUpdateDTO) {
        return await this.RoleService.updateRole(payload);
    }

    @MessagePattern({ cmd: "assets_role_delete" })
    @Delete()
    async deleteRole(payload: { id: string; }) {
        return this.RoleService.deleteRole(payload.id);
    }
}
