import { IsMongoId, IsNotEmpty, IsString, MaxLength, ValidateIf } from 'class-validator';
import { AllowNull } from '../../../decorators/validation';
import { ObjectId } from 'mongoose';
import { TCancellationUpdateDto } from '../../types/cancellation.types';

class CancellationUpdateDto implements TCancellationUpdateDto {
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
  cancellationText?: string;
}

export {CancellationUpdateDto}
