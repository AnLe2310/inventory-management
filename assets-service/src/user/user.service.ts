import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly UserModel: Model<User>) { }

    async hashPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }

    async comparePasswords(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
    }

    getUser(keyword?: string) {
        if (!keyword) return this.UserModel.find();

        return this.UserModel.find({
            $or: [
                { username: { $regex: keyword, $options: 'i' } },
                { email: { $regex: keyword, $options: 'i' } }
            ]
        });
    }

    getUserById(id: any) {
        return this.UserModel.findById(id);
    }

    async createUser(user: any) {
        user.password = await this.hashPassword(user.password);
        return new this.UserModel(user).save();
    }

    updateUser(user: any) {
        return this.UserModel.findByIdAndUpdate(user.id, user, { new: true });
    }

    deleteUser(id: any) {
        return this.UserModel.findByIdAndDelete(id, { new: true });
    }
}
