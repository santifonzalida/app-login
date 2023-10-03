import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigType } from '@nestjs/config';
import config from '../config';
import { FirebaseService } from './services/firebase.service';
import { FirebaseController } from './controllers/firebase.controller';

@Module({
  providers: [
    FirebaseService,
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: async (configService: ConfigType<typeof config>) => {
        console.log(process.env.FIREBASE_PRIVATE_KEY);
        const { privatekey } = JSON.parse(process.env.FIREBASE_PRIVATE_KEY);
        configService.firebase.private_key = privatekey;
        return await admin.initializeApp({
          credential: admin.credential.cert(configService.firebase),
          storageBucket: 'showroom-bf0c9.appspot.com',
        });
      },
      inject: [config.KEY],
    },
  ],
  exports: ['FIREBASE_ADMIN', FirebaseService],
  controllers: [FirebaseController],
})
export class FirebaseModule {}
