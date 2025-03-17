import { ObjectId } from 'mongoose';

type TResolution = {
  petitionId: ObjectId,
  resolutionText: string;
}
type TResolutionUpdateQueryDto = Partial<TResolution>
type TResolutionUpdateDto = Partial<TResolution>
type TResolutionUpdateByIdDto = Partial<TResolution>

export type { TResolution, TResolutionUpdateQueryDto, TResolutionUpdateDto, TResolutionUpdateByIdDto };