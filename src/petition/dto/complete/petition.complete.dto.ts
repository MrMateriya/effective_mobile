import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { TPetitionCompleteDto } from '../../types/petition.types';

class PetitionCompleteDto implements TPetitionCompleteDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  resolutionText: string;
}

export {PetitionCompleteDto}