import { IsString, IsOptional, MaxLength, IsIn } from 'class-validator';
import { PetitionStatuses, TPetitionStatuses, TPetitionUpdateDto } from '../../types/petition.types';

class PetitionUpdateDto implements TPetitionUpdateDto {
  @IsOptional()
  @IsIn(Object.values(PetitionStatuses))
  @IsString()
  @MaxLength(255)
  status?: TPetitionStatuses;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  subject?: string;
}

export {PetitionUpdateDto}