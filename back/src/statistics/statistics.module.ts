import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StatisticsController } from './controllers/statistics.controller';
import { StatisticsService } from './services/statistics.service';
import { DeviceConnection, DeviceConnectionSchema } from './entities/device.entity';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: DeviceConnection.name, schema: DeviceConnectionSchema}
      ]
    ),
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StadisticsModule {}
