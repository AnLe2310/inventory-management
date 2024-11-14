import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly UserModel: Model<User>) { }

    getUser() {
        return this.UserModel.find();
    }

    getUserById(id: any) {
        return this.UserModel.findById(id);
    }

    createUser(user: any) {
        return new this.UserModel(user).save();
    }

    updateUser(user: any) {
        return this.UserModel.findByIdAndUpdate(user.id, user, { new: true });
    }

    deleteUser(id: any) {
        return this.UserModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
    }
}
