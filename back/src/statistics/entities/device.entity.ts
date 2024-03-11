import { Document, Types } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { User } from '../../users/entities/user.entity';

@Schema()
export class DeviceConnection extends Document {
  @Prop()
  browser: string;

  @Prop()
  type: string;

  @Prop()
  operativeSystem: string;

  @Prop({ type: Date, default: Date.now })
  created: Date;

  @Prop({ type: Types.ObjectId, ref: User.name })
  userId: User | Types.ObjectId;
}

export const DeviceConnectionSchema =
  SchemaFactory.createForClass(DeviceConnection);
