import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PetitionService } from './petition.service';
import { DatabaseMongooseIdDto } from '../database/dto';
import {
  PetitionCancelAllDto,
  PetitionCancelDto,
  PetitionCompleteDto,
  PetitionCreateDto,
  PetitionGetAllQueryDto,
  PetitionUpdateByIdDto,
  PetitionUpdateDto,
  PetitionUpdateQueryDto,
} from './dto';

@Controller('petition')
export class PetitionController {
  constructor(
    private readonly petitionService: PetitionService,
  ) {}

  @Post()
  async create(@Body() petitionCreateDto: PetitionCreateDto) {
    return await this.petitionService.create(petitionCreateDto);
  }

  @Get()
  async getAll(@Query() petitionGetAllQueryDto: PetitionGetAllQueryDto) {
    return await this.petitionService.getAll(petitionGetAllQueryDto);
  }

  @Get(':id')
  async getById(@Param() databaseMongooseIdDto: DatabaseMongooseIdDto) {
    return await this.petitionService.getById(databaseMongooseIdDto);
  }

  @Patch()
  async update(@Query() petitionUpdateQueryDto: PetitionUpdateQueryDto,
               @Body() petitionUpdateDto: PetitionUpdateDto) {
    return await this.petitionService.update(petitionUpdateQueryDto, petitionUpdateDto);
  }

  @Patch(':id')
  async updateById(@Param() databaseMongooseIdDto: DatabaseMongooseIdDto,
                   @Body() petitionUpdateByIdDto: PetitionUpdateByIdDto) {
    return await this.petitionService.updateById(databaseMongooseIdDto, petitionUpdateByIdDto);
  }

  @Delete(':id')
  async deleteById(@Param() databaseMongooseIdDto: DatabaseMongooseIdDto) {
    return await this.petitionService.deleteById(databaseMongooseIdDto);
  }

  @Post('/take/:id')
  async take(@Param() databaseMongooseIdDto: DatabaseMongooseIdDto) {
    return await this.petitionService.take(databaseMongooseIdDto);
  }

  @Post('/complete/:id')
  async complete(@Param() databaseMongooseIdDto: DatabaseMongooseIdDto,
                 @Body() petitionCompleteDto: PetitionCompleteDto) {
    return await this.petitionService.complete(databaseMongooseIdDto, petitionCompleteDto);
  }

  @Post('/cancel/:id')
  async cancel(@Param() databaseMongooseIdDto: DatabaseMongooseIdDto,
               @Body() petitionCancelDto: PetitionCancelDto) {
    return await this.petitionService.cancel(databaseMongooseIdDto, petitionCancelDto);
  }

  @Post('/cancel-all-in-work')
  async cancelAllInWork(@Body() petitionCancelAllDto: PetitionCancelAllDto) {
    return await this.petitionService.cancelAllInWork(petitionCancelAllDto);
  }
}
