import {
    IsString,
    IsDate,
    IsMongoId,
  } from 'class-validator';
  
  export class CreateNewDeviceConnectionDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly type: string;
  
    @IsString()
    readonly operativeSystem: string;
  
    @IsDate()
    readonly created: Date = new Date();

    @IsString()
    @IsMongoId()
    readonly userId: string;
  }
  