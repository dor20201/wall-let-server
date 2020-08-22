import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesDto } from './dto/categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {
  }

  @Post()
  addCategory(@Body('category') categoriesDto: CategoriesDto) {
    this.categoryService.insertCategory(categoriesDto).then();
  }

  @Get()
  getAllCategory() {
    return this.categoryService.getCategory();
  }


}

