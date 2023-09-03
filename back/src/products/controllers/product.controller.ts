import {
  Controller,
  Get,
  Query,
  Post,
  Put,
  Param,
  Delete,
  Body,
} from '@nestjs/common';

import { ProductService } from '../services/product.service';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../dtos/product.dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('Products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getProducts(@Query() params: FilterProductDto) {
    return this.productService.findAll(params);
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
