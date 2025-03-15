import { IsMongoId, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ObjectId } from 'mongoose';

class CancellationCreateDto {
  @IsNotEmpty()
  @IsMongoId()
  petitionId: ObjectId;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  cancellationText: string;
}

export {CancellationCreateDto}