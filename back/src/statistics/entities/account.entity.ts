import { Document, Types } from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class Account extends Document {
  @Prop()
  id: string;

  @Prop()
  mail: string;

  @Prop()
  created: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
