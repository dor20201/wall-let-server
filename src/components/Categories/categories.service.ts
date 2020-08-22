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
      const result = await newCategory.save();
      return result;
    } catch (e) {
      throw new NotFoundException('The category were not insert correctly ');
    }
  }

  async getCategory():Promise<Categories[]> {
   const categories =  await this._categoriesModel.find().exec();
   return categories;
  }


}
