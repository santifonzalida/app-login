import { Document, Types } from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Device, DeviceSchema } from './device.entity';
import { Account, AccountSchema } from './account.entity';
import { MonthVisit, MonthVisitSchema } from './visit.entity';

export class Statistic extends Document {
  @Prop({type: [MonthVisitSchema]})
  visitors: Types.Array<MonthVisit>;

  @Prop({ Type: [DeviceSchema] })
  devices: Types.Array<Device>;

  @Prop({ type: [AccountSchema]})
  createdAccounts: Types.Array<Account>;
}

export const StatisticSchema = SchemaFactory.createForClass(Statistic);
