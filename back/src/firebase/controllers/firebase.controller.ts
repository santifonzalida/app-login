import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FirebaseService } from '../../firebase/services/firebase.service';
import { CreateImageDto } from '../../firebase/dtos/image.dto';

@ApiTags('Firebase')
@Controller()
export class FirebaseController {
  constructor(private firebaseService: FirebaseService) {}

  @Post('Firebase/guardarImagenes')
  saveImage(@Body() payload: CreateImageDto) {
    return this.firebaseService.subirImagen(payload);
  }
}
