import { IsMongoId, IsNotEmpty } from 'class-validator';
import { TDatabaseMongooseIdDto } from '../../types/database.types';
import { ObjectId } from 'mongoose';

class DatabaseMongooseIdDto implements TDatabaseMongooseIdDto {
  @IsNotEmpty()
  @IsMongoId()
  id: ObjectId
}

export {DatabaseMongooseIdDto}