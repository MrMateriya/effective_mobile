import { IsString, MaxLength, IsIn, IsNotEmpty, ValidateIf } from 'class-validator';
import { PetitionStatuses, TPetitionStatuses, TPetitionUpdateByIdDto } from '../../types/petition.types';
import { AllowNull } from '../../../decorators/validation';

class PetitionUpdateByIdDto implements TPetitionUpdateByIdDto {
  @ValidateIf((_, value) => value !== undefined)
  @AllowNull(false)
  @IsIn(Object.values(PetitionStatuses))
  @IsString()
  @MaxLength(255)
  status?: TPetitionStatuses;

  @ValidateIf((_, value) => value !== undefined)
  @AllowNull(false)
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  subject?: string;

  @ValidateIf((_, value) => value !== undefined)
  @AllowNull(false)
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description?: string;
}

export { PetitionUpdateByIdDto };