import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './interfaces/category.interface';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
    constructor(@InjectModel("Category") private readonly CategoryModel: Model<Category>) { }

    getCategory() {
        return this.CategoryModel.find()
    }

    getCategoryById(id: any) {
        return this.CategoryModel.findById(id)
    }

    createCategory(category: any) {
        return new this.CategoryModel(category).save()
    }

    updateCategory(category: any) {
        return this.CategoryModel.findByIdAndUpdate(category.id, category, {new: true})
    }

    deleteCategory(id: any) {
        return this.CategoryModel.findByIdAndDelete(id)
    }
}
