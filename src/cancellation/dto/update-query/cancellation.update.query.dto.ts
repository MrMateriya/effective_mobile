import { PartialType } from '@nestjs/mapped-types';
import { CancellationCreateDto } from '../';

class CancellationUpdateQueryDto extends PartialType(CancellationCreateDto) {}

export {CancellationUpdateQueryDto}