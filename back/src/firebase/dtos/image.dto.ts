import { IsNotEmpty, IsString, IsBase64 } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateImageDto {
  @IsBase64()
  @IsNotEmpty()
  readonly data: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

export class UpdateImageDto extends PartialType(CreateImageDto) {}
