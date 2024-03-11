import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeviceConnection } from '../entities/device.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(DeviceConnection.name)
    private deviceModel: Model<DeviceConnection>,
  ) {}

  getStatistics() {
    return this.deviceModel.find().exec();
  }
}
