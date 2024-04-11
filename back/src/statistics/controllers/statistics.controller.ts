import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StatisticsService } from '../services/statistics.service';
import { UsersService } from 'src/users/services/users.service';

@ApiTags('Statistics')
@Controller('Statistics')
export class StatisticsController {
  constructor(
    private statisticService: StatisticsService,
    private userService: UsersService,
  ) {}

  @Get()
  getStatistics() {
    const usuarios = this.userService.getUsersByFilter(2024);
    return usuarios;
  }
}
