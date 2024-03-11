import { Document, Types } from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/entities/user.entity';

export class DeviceConnection extends Document {
  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  operativeSystem: string;

  @Prop({ type: Date, default: Date.now })
  created: Date;

  @Prop({ type: Types.ObjectId, ref: User.name })
  userId: User | Types.ObjectId;
}

export const DeviceConnectionSchema = SchemaFactory.createForClass(DeviceConnection);
