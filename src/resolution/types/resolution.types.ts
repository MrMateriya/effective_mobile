import { Types } from 'mongoose';

type TResolution = {
  petitionId: Types.ObjectId,
  resolutionText: string;
}

export type { TResolution }