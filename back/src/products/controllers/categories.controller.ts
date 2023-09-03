import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';

@ApiTags('Categories')
@Controller('Categories')
export class CategoryController {
  constructor(private categoryService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Put(':id')
  updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  removeCategory(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
