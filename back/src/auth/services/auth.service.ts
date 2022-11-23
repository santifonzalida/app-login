import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/services/users.service';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { MailService } from 'src/mail/services/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (user) {
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (isMatchPassword) {
        const { password, ...res } = user.toJSON();
        return res;
      }
    }
    return null;
  }

  login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      username: payload.username,
      userId: payload.sub,
    };
  }

  async validateEmailAddress(payload: ResetPasswordDto) {
    try {
      const user = await this.usersService.getUserByEmail(payload.email);
      if (user) {
        const secret = user.password + user.created;
        const token = this.jwtService.sign(payload, { secret: secret });
        this.mailService.sendUserResetPasswordConfirmation(user, token);
        return {
          message: `We sent an email with instructions to ${payload.email} `,
          success: true,
        };
      }
      throw new NotFoundException(`The email address is not registered.`);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
