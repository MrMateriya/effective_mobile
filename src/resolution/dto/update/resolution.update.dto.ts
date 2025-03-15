import { PartialType } from '@nestjs/mapped-types';
import { ResolutionCreateDto } from '../';

class ResolutionUpdateDto extends PartialType(ResolutionCreateDto) {

}

export {ResolutionUpdateDto}