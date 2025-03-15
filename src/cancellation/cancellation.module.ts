import { Module } from '@nestjs/common';
import { CancellationService } from './cancellation.service';
import { CancellationController } from './cancellation.controller';
import { PetitionModule } from '../petition/petition.module';
import { DatabaseModule } from '../database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Cancellation, CancellationSchema } from './schema/cancellation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Cancellation.name,
      schema: CancellationSchema,
    }]),
    PetitionModule,
    DatabaseModule,
  ],
  controllers: [CancellationController],
  providers: [CancellationService],
})
export class CancellationModule {}
