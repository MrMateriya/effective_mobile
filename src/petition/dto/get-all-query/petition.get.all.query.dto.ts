import { IsDate, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { TPetitionGetAllQueryDto } from '../../types/petition.types';
import { AllowNull } from '../../../decorators/validation';

class PetitionGetAllQueryDto implements TPetitionGetAllQueryDto {
  @ValidateIf((_, value) => value !== undefined)
  @AllowNull(false)
  @Type(() => Date)
  @IsDate()
  start?: string;

  @ValidateIf((_, value) => value !== undefined)
  @AllowNull(false)
  @Type(() => Date)
  @IsDate()
  end?: string;
}

export { PetitionGetAllQueryDto };