import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jwt-simple');

import { UsersService } from '../../users/services/users.service';
import { ResetPasswordDto, ValidateUrlDto } from '../dtos/reset-password.dto';
import { MailService } from '../../mail/services/mail.service';

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
    const payload = { username: user.email, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      username: payload.username,
      userId: payload.sub,
      navigateTo: payload.role == 'admin' ? '/dashboard' : '/my-account',
    };
  }

  async validateEmailAddress(payload: ResetPasswordDto) {
    try {
      const user = await this.usersService.getUserByEmail(payload.email);
      if (user) {
        const secret = user.password + user.created;
        const token = jwt.encode(payload, secret);
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

  async validateUrl(payload: ValidateUrlDto) {
    let isValid = false;
    try {
      const user = await this.usersService.getUserById(payload.userId);
      const secret = user.password + user.created;
      const decodedPayload = jwt.decode(payload.token, secret);
      if (decodedPayload.email === user.email) {
        isValid = true;
      }
    } catch (error) {
      throw new BadRequestException(
        `It's not possible to reset your password. Please contact the admin site.`,
      );
    }
    return { isValidUrl: isValid };
  }

  decodeUserToken(userToken: string) {
    return this.jwtService.decode(userToken);
  }
}
