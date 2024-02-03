import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsDate,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateSocialMediaDto } from '../dtos/socialMedia.dto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  @ApiProperty()
  readonly password: string;

  @IsString()
  @ApiProperty()
  readonly role: string = 'customer';

  @ApiProperty()
  @IsString()
  readonly fullName: string;

  @ApiProperty()
  @IsDate()
  readonly created: Date = new Date();

  @ApiProperty()
  @IsString()
  readonly avatarUrl: string = '';

  @ApiProperty()
  @IsString()
  readonly notes: string = '';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSocialMediaDto)
  readonly socialMedia: CreateSocialMediaDto[];

  @IsArray()
  readonly productsLikes: string[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdatePasswordUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(6)
  @ApiProperty()
  readonly password: string;
}
