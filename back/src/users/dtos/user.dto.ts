import { IsString, IsNotEmpty, IsEmail, Length, IsDate } from 'class-validator';
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

  @ApiProperty()
  @IsDate()
  readonly created: Date = new Date();

  @ApiProperty()
  @IsString()
  readonly avatarUrl: string = '';

  @ApiProperty()
  @IsString()
  readonly notes: string = '';
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdatePasswordUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(6)
  @ApiProperty()
  readonly password: string;
}
