import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Product, ProductSchema } from './entities/product.entity';
import { Category, CategorySchema } from './entities/category.entity';
import { ProductController } from './controllers/product.controller';
import { CategoryController } from './controllers/categories.controller';
import { ProductService } from './services/product.service';
import { CategoriesService } from './services/categories.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [ProductController, CategoryController],
  providers: [ProductService, CategoriesService],
  exports: [ProductService],
})
export class ProductModule {}
