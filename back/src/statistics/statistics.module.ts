import { Module } from '@nestjs/common';

import { StatisticsController } from './controllers/statistics.controller';
import { StatisticsService } from './services/statistics.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StadisticsModule {}
