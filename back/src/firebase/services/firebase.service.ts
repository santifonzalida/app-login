import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor(private readonly firebaseAdmin: admin.app.App) {}

  async subirImagen(data: Buffer, nombre: string): Promise<string> {
    const bucket = this.firebaseAdmin.storage().bucket();
    const file = bucket.file(nombre);

    await file.save(data, {
      metadata: {
        contentType: 'image/jpeg',
      },
    });

    return `https://storage.googleapis.com/${bucket.name}/${nombre}`;
  }
}
