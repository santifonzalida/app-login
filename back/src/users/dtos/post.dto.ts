import { IsString, IsNotEmpty, IsArray, IsNumber } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly date: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly image: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly latitude: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly longitude: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly userId: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  readonly tags: string[];
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
