import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class File extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  image: string;

  @Prop()
  size: number;

  @Prop()
  fechaCreacion: string;

  @Prop()
  extension: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
