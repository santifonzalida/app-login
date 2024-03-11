import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeviceConnection } from '../entities/device.entity';
import { CreateNewDeviceConnectionDto } from '../dtos/newConnection.dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(DeviceConnection.name)
    private deviceConnectionModel: Model<DeviceConnection>,
  ) {}

  createNewDevice(newDeviceDto: CreateNewDeviceConnectionDto) {
    const newConnectionDevice = new this.deviceConnectionModel(newDeviceDto);
    return newConnectionDevice.save();
  }
}
