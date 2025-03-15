import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TResolution } from '../types/resolution.types';
import { Types, SchemaTypes } from 'mongoose';
import { Petition } from '../../petition/schema/petition.schema';

@Schema({ timestamps: true })
class Resolution implements TResolution {
  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: Petition.name
  })
  petitionId: Types.ObjectId;

  @Prop({
    required: true,
    type: String,
    maxlength: 255,
  })
  resolutionText: string;

  createdAt: Date;
  updatedAt: Date;
}

const ResolutionSchema = SchemaFactory.createForClass(Resolution);

export { ResolutionSchema, Resolution }