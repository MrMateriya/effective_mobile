import { Types } from 'mongoose';

type TCancellation = {
  petitionId: Types.ObjectId;
  cancellationText: string;
}

export type {TCancellation}