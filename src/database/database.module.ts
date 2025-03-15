import { Module } from '@nestjs/common';
import { DatabaseMongooseIdDto } from './dto/mongoose-id-dto/database.mongoose.id.dto';

@Module({
  imports: [DatabaseMongooseIdDto],
  exports: [DatabaseMongooseIdDto]
})
export class DatabaseModule {}
