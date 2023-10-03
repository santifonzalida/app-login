import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Image extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  imageUrl: string;

  @Prop()
  size: number;

  @Prop()
  fechaCreacion: string;

  @Prop()
  extension: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
