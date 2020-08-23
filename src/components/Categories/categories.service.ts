import { Injectable, NotFoundException } from '@nestjs/common';
import { Categories } from './categories.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CategoriesDto } from './dto/categories.dto';

@Injectable()
export class CategoriesService {

  constructor(@InjectModel('Categories') private readonly _categoriesModel: Model<Categories>) {
  }

  async insertCategory(categoryDto: CategoriesDto) {
    try {
      const newCategory = new this._categoriesModel(categoryDto)
      return await newCategory.save();
    } catch (e) {
      throw new NotFoundException('The category were not insert correctly ');
    }
  }

  async getCategories():Promise<Categories[]> {
    return await this._categoriesModel.find().exec();
  }


}
