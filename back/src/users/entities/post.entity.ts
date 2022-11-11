import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  body: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  author: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  latitude: number;

  @Prop()
  longitude: number;

  @Prop()
  tags: string[];
}
export const PostSchema = SchemaFactory.createForClass(Post);
