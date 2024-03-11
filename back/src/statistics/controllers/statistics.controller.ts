import {
    Controller,
    Post,
    Body,
  } from '@nestjs/common';
  import { CreateNewDeviceConnectionDto } from '../dtos/newConnection.dto';
  import { StatisticsService } from '../services/statistics.service';
  import { ApiTags } from '@nestjs/swagger';
  
  @ApiTags('Statistics')
  @Controller('Statistics')
  export class StatisticsController {
    constructor(private statisticService: StatisticsService) {}
  
    @Post()
    saveNewConnection(@Body() createNewDeviceConnectionDto: CreateNewDeviceConnectionDto) {
      return this.statisticService.createNewDevice(createNewDeviceConnectionDto);
    }
  
  }
  