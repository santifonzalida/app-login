import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Product } from '../entities/product.entity';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../dtos/product.dtos';
import { DeleteImagesDto } from '../../firebase/dtos/image.dto';
import { FirebaseService } from 'src/firebase/services/firebase.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private firebaseService: FirebaseService,
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

  async remove(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product ${id} not found.`);
    }
    if (product.images && product.images.length > 0) {
      try {
        const filenames: DeleteImagesDto = {
          images: [],
        };
        product.images.forEach((img: any) => {
          filenames.images.push(img.name);
        });
        this.firebaseService.remove(filenames);
      } catch (error) {
        throw new InternalServerErrorException(
          'Error al eliminar imagenes. Fireabse.' + error,
        );
      }
    }
    return this.productModel.findByIdAndRemove(product._id);
  }
}
