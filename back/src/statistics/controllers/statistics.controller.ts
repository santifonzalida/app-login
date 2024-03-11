import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from '../services/statistics.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Statistics')
@Controller('Statistics')
export class StatisticsController {
  constructor(private statisticService: StatisticsService) {}

  @Get()
  getStatistics() {
    return 'Work in progress';
  }
}
