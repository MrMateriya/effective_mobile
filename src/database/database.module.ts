import { Module } from '@nestjs/common';
import { DatabaseMongooseIdDto } from './dto';

@Module({
  imports: [DatabaseMongooseIdDto],
  exports: [DatabaseMongooseIdDto]
})
export class DatabaseModule {}
