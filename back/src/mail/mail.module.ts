import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './services/mail.service';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from '@nestjs/config';
import config from '../config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { host, user, password, from } = configService.mailer;
        return {
          transport: {
            host,
            secure: false,
            auth: {
              user,
              pass: password,
            },
          },
          defaults: {
            from: `No reply <${from}>`,
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
