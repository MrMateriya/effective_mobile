import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { TPetitionCancelAllDto } from '../../types/petition.types';

class PetitionCancelAllDto implements TPetitionCancelAllDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  cancellationText: string;
}

export { PetitionCancelAllDto }