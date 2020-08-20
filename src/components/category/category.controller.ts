import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {
  }

  @Post()
  addCategory(@Body('category') categoryDto: CategoryDto) {
    this.categoryService.insertCategory(categoryDto).then();
  }

  @Get()
  getAllCategory() {
    return this.categoryService.getCategory();
  }


}

