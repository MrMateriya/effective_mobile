import { Module } from '@nestjs/common';
import { CancellationService } from './cancellation.service';
import { CancellationController } from './cancellation.controller';
import { DatabaseModule } from '../database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Cancellation, CancellationSchema } from './schema/cancellation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Cancellation.name,
      schema: CancellationSchema,
    }]),
    DatabaseModule,
  ],
  controllers: [CancellationController],
  providers: [CancellationService],
  exports: [CancellationService],
})
export class CancellationModule {}
