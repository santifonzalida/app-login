import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateImageDto, DeleteImagesDto } from '../dtos/image.dto';

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

    const fileRef = bucket
      .file(`${name}`)
      .getSignedUrl({ action: 'read', expires: '01-01-2025' })
      .then((url) => {
        return url;
      })
      .catch((error) => {
        console.log('Error al obtener URL' + error);
      });
    return fileRef;
  }

  remove = (payload: DeleteImagesDto) => {
    if (payload.images.length > 0) {
      payload.images.forEach((fileName) => {
        const archivoRef = admin.storage().bucket().file(fileName);

        archivoRef
          .delete()
          .then((response) => {
            return response;
          })
          .catch((error) => {
            console.error(
              'Error al eliminar el archivo:',
              error.errors ? error.errors[0].message : '',
              error.code ? error.code : '',
            );
          });
      });
    }
  };
}
