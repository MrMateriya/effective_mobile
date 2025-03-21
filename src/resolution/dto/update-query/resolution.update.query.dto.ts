import { IsMongoId, IsNotEmpty, IsString, MaxLength, ValidateIf } from 'class-validator';
import { ObjectId } from 'mongoose';
import { TResolutionUpdateQueryDto } from '../../types/resolution.types';
import { AllowNull } from '../../../decorators/validation';

class ResolutionUpdateQueryDto implements TResolutionUpdateQueryDto {
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

export {ResolutionUpdateQueryDto}