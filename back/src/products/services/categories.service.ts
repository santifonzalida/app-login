import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  findAll() {
    return this.categoryModel.find().exec();
  }

  create(categoryDto: CreateCategoryDto) {
    const newCategory = new this.categoryModel(categoryDto);
    return newCategory.save();
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = this.categoryModel
      .findByIdAndUpdate(id, { $set: updateCategoryDto }, { new: true })
      .exec();
    if (!category) {
      throw new NotFoundException(`Category ${id} not found.`);
    }
    return category;
  }

  remove(id: string) {
    return this.categoryModel.findByIdAndDelete(id);
  }
}
