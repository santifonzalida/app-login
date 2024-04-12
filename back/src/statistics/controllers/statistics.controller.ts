import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { UsersService } from 'src/users/services/users.service';

@ApiTags('Statistics')
@Controller('Statistics')
export class StatisticsController {
  constructor(private userService: UsersService) {}

  @Get('getCuentasCreadas/:year')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  getUsersByYear(@Param('year') year: number) {
    return this.userService.getUsersByFilter(year);
  }

  @Get('getProductosLikeados')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  getProductosLikeados() {
    return this.userService.getLikedProducts();
  }
}
