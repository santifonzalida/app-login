import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

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
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
