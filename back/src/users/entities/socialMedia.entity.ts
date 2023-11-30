import { Document } from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class SocialMedia extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  url: string;
}

export const SocialMediaSchema = SchemaFactory.createForClass(SocialMedia);
