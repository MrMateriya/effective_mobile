import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import { MongoOptions } from './database/consts/database.consts';
import { PetitionModule } from './petition/petition.module';
import { DatabaseModule } from './database/database.module';
import { ResolutionModule } from './resolution/resolution.module';
import { CancellationModule } from './cancellation/cancellation.module';
import { Petition, PetitionSchema } from './petition/schema/petition.schema';

@Module({
  imports: [
    ConfigModule.forRoot<NodeJS.ProcessEnv>(),
    MongooseModule.forRootAsync(MongoOptions),
    PetitionModule,
    DatabaseModule,
    ResolutionModule,
    CancellationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


