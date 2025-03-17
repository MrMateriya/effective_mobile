import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TCancellation } from '../types/cancellation.types';
import { SchemaTypes, ObjectId } from 'mongoose';
import { Petition } from '../../petition/schema/petition.schema';

@Schema({ timestamps: true })
class Cancellation implements TCancellation {
  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: Petition.name,
  })
  petitionId: ObjectId;

  @Prop({
    required: true,
    type: String,
    maxlength: 255,
  })
  cancellationText: string;

  createdAt: Date;
  updatedAt: Date;
}

const CancellationSchema = SchemaFactory.createForClass(Cancellation);

export { CancellationSchema, Cancellation };