import {
  Controller,
  Post,
  Put,
  Get,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UpdatePasswordUserDto,
} from '../dtos/user.dto';
import { RolesGuard } from '../../auth/guards/roles.guards';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { MongoIdPipe } from '../../common/pipes/mongo-id.pipe';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';

@ApiTags('Users')
@Controller('users')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.createUser(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }

  @Put('updatePassword/:id')
  updatePassword(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdatePasswordUserDto,
  ) {
    return this.usersService.updatePassword(id, payload);
  }
}
