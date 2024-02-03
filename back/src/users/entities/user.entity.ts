import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { SocialMedia, SocialMediaSchema } from '../entities/socialMedia.entity';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true })
  role: string;

  @Prop()
  fullName: string;

  @Prop()
  created: Date;

  @Prop()
  avatarUrl: string;

  @Prop()
  notes: string;

  @Prop({ Type: [SocialMediaSchema] })
  socialMedia: Types.Array<SocialMedia>;

  @Prop()
  productsLikes: Types.Array<string>;
}
export const UserSchema = SchemaFactory.createForClass(User);
