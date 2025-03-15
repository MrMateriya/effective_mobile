import { IsString, IsOptional, MaxLength, IsIn } from 'class-validator';
import { PetitionStatuses, TPetitionStatuses, TPetitionUpdateQueryDto } from '../../types/petition.types';

class PetitionUpdateQueryDto implements TPetitionUpdateQueryDto {
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

export {PetitionUpdateQueryDto}