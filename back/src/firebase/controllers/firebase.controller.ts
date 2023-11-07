import { Controller, Body, Post, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';

import { FirebaseService } from '../../firebase/services/firebase.service';
import { CreateImageDto, DeleteImagesDto } from '../../firebase/dtos/image.dto';

@ApiTags('Firebase')
@Controller()
export class FirebaseController {
  constructor(private firebaseService: FirebaseService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Post('Firebase/guardarImagenes')
  saveImage(@Body() payload: CreateImageDto) {
    return this.firebaseService.subirImagen(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Delete('Firebase/eliminarImagenes')
  removeProduct(@Body() payload: DeleteImagesDto) {
    return this.firebaseService.remove(payload);
  }
}
