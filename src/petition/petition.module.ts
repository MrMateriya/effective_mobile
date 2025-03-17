import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Petition, PetitionSchema } from './schema/petition.schema';
import { PetitionController } from './petition.controller';
import { PetitionService } from './petition.service';
import { DatabaseModule } from '../database/database.module';
import { ResolutionModule } from '../resolution/resolution.module';
import { CancellationModule } from '../cancellation/cancellation.module';
import { ResolutionService } from '../resolution/resolution.service';
import { CancellationService } from '../cancellation/cancellation.service';
import { Resolution, ResolutionSchema } from '../resolution/schema/resolution.schema';
import { Cancellation, CancellationSchema } from '../cancellation/schema/cancellation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
        name: Petition.name,
        schema: PetitionSchema,
    }]),
    MongooseModule.forFeature([{
      name: Resolution.name,
      schema: ResolutionSchema,
    }]),
    MongooseModule.forFeature([{
      name: Cancellation.name,
      schema: CancellationSchema,
    }]),
    DatabaseModule,
    ResolutionModule,
    CancellationModule,
  ],
  controllers: [PetitionController],
  providers: [PetitionService, ResolutionService, CancellationService],
})
export class PetitionModule {

}