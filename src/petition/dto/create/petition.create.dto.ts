import { TPetitionCreateDto } from '../../types/petition.types';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

class PetitionCreateDto implements TPetitionCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  subject: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description: string;
}

export {PetitionCreateDto}