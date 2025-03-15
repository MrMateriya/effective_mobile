import { IsMongoId, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ObjectId } from 'mongoose';

class ResolutionCreateDto {
  @IsNotEmpty()
  @IsMongoId()
  petitionId: ObjectId;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  resolutionText: string;
}

export {ResolutionCreateDto}
