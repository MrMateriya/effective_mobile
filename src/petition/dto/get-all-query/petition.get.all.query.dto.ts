import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { TPetitionGetAllQueryDto } from '../../types/petition.types';

class PetitionGetAllQueryDto implements TPetitionGetAllQueryDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  start?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  end?: string;
}

export { PetitionGetAllQueryDto };