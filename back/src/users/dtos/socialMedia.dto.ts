import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateSocialMediaDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsUrl()
  @IsString()
  readonly url: string;
}

export class UpdateSocialMediaDto extends PartialType(CreateSocialMediaDto) {}
