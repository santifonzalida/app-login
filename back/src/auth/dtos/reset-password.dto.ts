import { IsString, IsNotEmpty, IsEmail, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty()
  readonly email: string;
}

export class ValidateUrlDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly token: string;
}
