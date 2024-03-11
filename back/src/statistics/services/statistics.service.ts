import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeviceConnection } from '../entities/device.entity';
import { CreateNewDeviceConnectionDto } from '../dtos/newConnection.dto';


@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(DeviceConnection.name) private deviceModel: Model<DeviceConnection>
  ) {}
  
  getDevices() {
    return this.deviceModel.find().exec();
  }

  createNewDevice(newDevice: CreateNewDeviceConnectionDto) {
    const newConnectionDevice = new this.deviceModel(newDevice);
    return newConnectionDevice.save();
  }

}
