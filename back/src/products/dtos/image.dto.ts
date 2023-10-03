import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsUrl,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateImageDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly extention: string;

  @IsNumber()
  @IsOptional()
  readonly size: number;

  @IsUrl()
  @IsNotEmpty()
  readonly imageUrl: string;
}

export class UpdateImageDto extends PartialType(CreateImageDto) {}
