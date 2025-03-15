import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PetitionStatuses, TPetition, TPetitionStatuses } from '../types/petition.types';

@Schema({ timestamps: true })
class Petition implements TPetition {
  @Prop({
    type: String,
    enum: Object.values(PetitionStatuses),
    default: PetitionStatuses.new,
  })
  status: TPetitionStatuses;

  @Prop({
    type: String,
    default: '',
    maxlength: 255,
  })
  description: string;

  @Prop({
    type: String,
    default: '',
    maxlength: 255,
  })
  subject: string;

  createdAt: Date;
  updatedAt: Date;
}

const PetitionSchema = SchemaFactory.createForClass(Petition);

export { PetitionSchema, Petition }