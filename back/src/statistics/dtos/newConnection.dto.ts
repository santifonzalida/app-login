import { IsString, IsDate } from 'class-validator';

export class CreateNewDeviceConnectionDto {
  @IsString()
  readonly browser: string;

  @IsString()
  readonly type: string;

  @IsString()
  readonly operativeSystem: string;

  @IsDate()
  readonly created: Date = new Date();

  @IsString()
  readonly userId: string;
}
