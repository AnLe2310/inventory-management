import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './interfaces/role.interface';

@Injectable()
export class RoleService {
    constructor(@InjectModel('Role') private readonly RoleModel: Model<Role>) { }

    getRole() {
        return this.RoleModel.find();
    }

    getRoleById(id: any) {
        return this.RoleModel.findById(id);
    }

    createRole(role: any) {
        return new this.RoleModel(role).save();
    }

    updateRole(role: any) {
        return this.RoleModel.findByIdAndUpdate(role.id, role, { new: true });
    }

    deleteRole(id: any) {
        return this.RoleModel.findByIdAndDelete(id);
    }
}
