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

@Module({
  imports: [
    MongooseModule.forFeature([{
        name: Petition.name,
        schema: PetitionSchema,
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