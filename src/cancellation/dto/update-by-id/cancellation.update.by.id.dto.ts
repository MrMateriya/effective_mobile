import { IsMongoId, IsNotEmpty, IsString, MaxLength, ValidateIf } from 'class-validator';
import { AllowNull } from '../../../decorators/validation';
import { ObjectId } from 'mongoose';
import { TCancellationUpdateByIdDto } from '../../types/cancellation.types';

class CancellationUpdateByIdDto implements TCancellationUpdateByIdDto {
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

export {CancellationUpdateByIdDto}
