import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Product } from '../entities/product.entity';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../dtos/product.dtos';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(params: FilterProductDto) {
    if (params) {
      const filter: FilterQuery<Product> = {};
      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;
      if (minPrice && maxPrice) {
        filter.price = { $gte: minPrice, $lte: maxPrice };
      }
      return await this.productModel
        .find(filter)
        .populate('category')
        .skip(offset)
        .limit(limit)
        .exec();
    }
    return await this.productModel.find().populate('category').exec();
  }

  async findById(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product ${id} not found.`);
    }
    return product;
  }

  create(createProductDto: CreateProductDto) {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productModel
      .findByIdAndUpdate(id, { $set: updateProductDto }, { new: true })
      .exec();

    if (!product) {
      throw new NotFoundException(`Product ${id} not found.`);
    }
    return product;
  }

  remove(id: string) {
    return this.productModel.findByIdAndRemove(id);
  }
}
