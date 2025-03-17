import { IsString, MaxLength, IsIn, ValidateIf } from 'class-validator';
import { PetitionStatuses, TPetitionStatuses, TPetitionUpdateDto } from '../../types/petition.types';
import { AllowNull } from '../../../decorators/validation';

class PetitionUpdateDto implements TPetitionUpdateDto {
  @ValidateIf((_, value) => value !== undefined)
  @AllowNull(false)
  @IsIn(Object.values(PetitionStatuses))
  @IsString()
  @MaxLength(255)
  status?: TPetitionStatuses;

  @ValidateIf((_, value) => value !== undefined)
  @AllowNull(false)
  @IsString()
  @MaxLength(255)
  description?: string;

  @ValidateIf((_, value) => value !== undefined)
  @AllowNull(false)
  @IsString()
  @MaxLength(255)
  subject?: string;
}

export {PetitionUpdateDto}