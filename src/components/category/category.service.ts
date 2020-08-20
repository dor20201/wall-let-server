import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './category.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {

  constructor(@InjectModel('Category') private readonly _categoryModel: Model<Category>) {
  }

  async insertCategory(categoryDto: CategoryDto) {
    try {
      const newCategory = new this._categoryModel(categoryDto)
      const result = await newCategory.save();
      return result;
    } catch (e) {
      throw new NotFoundException('The category were not insert correctly ');
    }
  }

  async getCategory(){
   return await this._categoryModel.find().exec();
  }


}
