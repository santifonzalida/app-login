import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  ValidateIf,
  Min,
  IsMongoId,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @ApiProperty()
  readonly stock: number;

  @IsUrl()
  @ApiProperty()
  readonly image: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  readonly category: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  @Min(0)
  offset: number;

  @IsOptional()
  @Min(0)
  minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsOptional()
  @IsPositive()
  maxPrice: number;
}
