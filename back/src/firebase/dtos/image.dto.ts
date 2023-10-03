import {
  IsNotEmpty,
  IsString,
  IsBase64,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateImageDto {
  @IsBase64()
  @IsNotEmpty()
  readonly data: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly extention: string;

  @IsNumber()
  @IsOptional()
  readonly size: number;
}

export class UpdateImageDto extends PartialType(CreateImageDto) {}
