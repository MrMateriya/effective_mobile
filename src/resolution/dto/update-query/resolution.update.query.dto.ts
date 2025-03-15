import { PartialType } from '@nestjs/mapped-types';
import { ResolutionCreateDto } from '../';

class ResolutionUpdateQueryDto extends PartialType(ResolutionCreateDto) {

}

export {ResolutionUpdateQueryDto}