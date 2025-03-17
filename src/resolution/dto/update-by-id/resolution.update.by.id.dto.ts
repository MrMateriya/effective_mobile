import { TResolutionUpdateByIdDto } from '../../types/resolution.types';
import { IsMongoId, IsNotEmpty, IsString, MaxLength, ValidateIf } from 'class-validator';
import { AllowNull } from '../../../decorators/validation';
import { ObjectId } from 'mongoose';

class ResolutionUpdateByIdDto implements TResolutionUpdateByIdDto {
  @ValidateIf((_, value) => value !== undefined)
  @AllowNull(false)
  @IsNotEmpty()
  @IsMongoId()
  petitionId?: ObjectId;

  @ValidateIf((_, value) => value !== undefined)
  @AllowNull(false)
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  resolutionText?: string;
}

export { ResolutionUpdateByIdDto }