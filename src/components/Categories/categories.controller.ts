import { Controller, Post, Body, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesDto } from './dto/categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private _categoryService: CategoriesService) {
  }

  @Post()
  addCategory(@Body('category') categoriesDto: CategoriesDto) {
    this._categoryService.insertCategory(categoriesDto).then();
  }

  @Get()
  getAllCategory() {
    return this._categoryService.getCategories();
  }


}

