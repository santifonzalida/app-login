import {
  Controller,
  Get,
  Query,
  Post,
  Put,
  Param,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';

import { ProductService } from '../services/product.service';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
  DeleteProductDto,
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
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  removeProduct(@Body() payload: DeleteProductDto) {
    return this.productService.remove(payload.productId);
  }
}
