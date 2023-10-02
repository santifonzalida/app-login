import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateImageDto } from '../dtos/image.dto';

@Injectable()
export class FirebaseService {
  constructor(@Inject('FIREBASE_ADMIN') private firebaseAdmin: admin.app.App) {}

  async subirImagen(payload: CreateImageDto): Promise<string> {
    const { data, name } = payload;
    const bucket = this.firebaseAdmin.storage().bucket();
    const file = bucket.file(name);
    const buffer = Buffer.from(data, 'base64');

    await file.save(buffer, {
      metadata: {
        contentType: 'image/jpeg',
      },
    });

    return `https://storage.googleapis.com/${bucket.name}/${name}`;
  }
}
