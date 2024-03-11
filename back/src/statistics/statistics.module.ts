import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StatisticsController } from './controllers/statistics.controller';
import { StatisticsService } from './services/statistics.service';
import {
  DeviceConnection,
  DeviceConnectionSchema,
} from './entities/device.entity';
import { DeviceService } from './services/device.service';
import { DeviceConnectionController } from './controllers/devices.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DeviceConnection.name,
        schema: DeviceConnectionSchema,
      },
    ]),
  ],
  controllers: [StatisticsController, DeviceConnectionController],
  providers: [StatisticsService, DeviceService],
})
export class StadisticsModule {}
