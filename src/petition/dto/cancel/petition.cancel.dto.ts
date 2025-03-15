import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { TPetitionCancelDto } from '../../types/petition.types';

class PetitionCancelDto implements TPetitionCancelDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  cancellationText: string;
}

export {PetitionCancelDto}