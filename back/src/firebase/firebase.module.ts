import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from '../config';
import { FirebaseService } from './services/firebase.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        return admin.initializeApp({
          credential: admin.credential.cert(configService.firebase),
          storageBucket: 'login-app-6d4d8.appspot.com',
        });
      },
      inject: [config.KEY],
    }),
  ],
  exports: [FirebaseService],
  providers: [FirebaseService],
})
export class FirebaseModule {}
