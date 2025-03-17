import { Module } from '@nestjs/common';
import { ResolutionService } from './resolution.service';
import { ResolutionController } from './resolution.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Resolution, ResolutionSchema } from './schema/resolution.schema';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Resolution.name,
      schema: ResolutionSchema,
    }]),
    DatabaseModule,
  ],
  controllers: [ResolutionController],
  providers: [ResolutionService],
  exports: [ResolutionService],
})
export class ResolutionModule {}
