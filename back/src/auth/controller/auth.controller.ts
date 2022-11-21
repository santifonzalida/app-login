import { Controller, Body, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { ResetPasswordDto } from '../dtos/reset-password.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/forgotpassword')
  forgotpassword(@Body() payload: ResetPasswordDto) {
    return this.authService.validateEmailAddress(payload);
  }
}
