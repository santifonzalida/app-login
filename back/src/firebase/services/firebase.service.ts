import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateImageDto } from '../dtos/image.dto';

@Injectable()
export class FirebaseService {
  constructor(@Inject('FIREBASE_ADMIN') private firebaseAdmin: admin.app.App) {}

  async subirImagen(payload: CreateImageDto): Promise<any> {
    const { data, name, extention } = payload;
    const bucket = this.firebaseAdmin.storage().bucket();
    const file = bucket.file(name);
    const buffer = Buffer.from(data, 'base64');

    await file.save(buffer, {
      metadata: {
        contentType: `${extention}`,
      },
    });

    const fileRef = bucket.file(`${name}`);

    const [descargaData] = await fileRef.download();

    return descargaData;
  }
}
