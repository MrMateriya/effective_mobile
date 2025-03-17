import { ObjectId } from 'mongoose';

type TCancellation = {
  petitionId: ObjectId;
  cancellationText: string;
}

type TCancellationUpdateQueryDto = Partial<TCancellation>
type TCancellationUpdateDto = Partial<TCancellation>
type TCancellationUpdateByIdDto = Partial<TCancellation>

export type { TCancellation, TCancellationUpdateQueryDto, TCancellationUpdateDto, TCancellationUpdateByIdDto }