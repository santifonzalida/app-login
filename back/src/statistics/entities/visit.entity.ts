import { Document, Types } from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';


export class MonthVisit extends Document {
    @Prop()
    month: number;

    @Prop()
    count: number;
}

export const MonthVisitSchema = SchemaFactory.createForClass(MonthVisit);