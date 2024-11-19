import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department } from './interfaces/department.interface';

@Injectable()
export class DepartmentsService {
    constructor(@InjectModel('Department') private readonly DepartmentModel: Model<Department>) {}

    getDepartment(keyword: string) {
        return this.DepartmentModel.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
            ]
        })
    }

    getDepartmentById(id: any) {
        return this.DepartmentModel.findById(id)
    }

    createDepartment(department: any) {
        return new this.DepartmentModel(department).save()
    }

    updateDepartment(department: any) {
        return this.DepartmentModel.findByIdAndUpdate(department.id, department, {new: true})
    }

    deleteDepartment(id: any) {
        return this.DepartmentModel.findByIdAndDelete(id)
    }
}
