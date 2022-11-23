import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable } from '@nestjs/common';

import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserResetPasswordConfirmation(user: User, token: string) {
    const url = `http://192.169.100.23:3001/auth/:userId/confirm?token=${token}`;
    try {
      await this.mailerService.sendMail({
        to: user.email,
        from: 'no-reply@support.com',
        subject: 'Reset password confirmation',
        template: './reset-password',
        context: {
          name: user.fullName,
          url,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
