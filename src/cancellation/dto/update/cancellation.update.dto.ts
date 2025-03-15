import { PartialType } from '@nestjs/mapped-types';
import { CancellationCreateDto } from '../';

class CancellationUpdateDto extends PartialType(CancellationCreateDto) {}

export {CancellationUpdateDto}
