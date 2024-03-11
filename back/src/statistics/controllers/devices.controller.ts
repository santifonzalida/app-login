import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateNewDeviceConnectionDto } from '../dtos/newConnection.dto';
import { DeviceService } from '../services/device.service';

@ApiTags('Devices')
@Controller('devices')
export class DeviceConnectionController {
  constructor(private deviceService: DeviceService) {}

  @Post()
  create(@Body() payload: CreateNewDeviceConnectionDto) {
    return this.deviceService.createNewDevice(payload);
  }
}
