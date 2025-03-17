import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode } from '@nestjs/common';
import { CancellationService } from './cancellation.service';
import {
  CancellationCreateDto,
  CancellationUpdateByIdDto,
  CancellationUpdateDto,
  CancellationUpdateQueryDto,
} from './dto';
import { DatabaseMongooseIdDto } from '../database/dto';

@Controller('cancellation')
export class CancellationController {
  constructor(
    private readonly cancellationService: CancellationService,
  ) {
  }

  @Post()
  async create(@Body() cancellationCreateDto: CancellationCreateDto) {
    return this.cancellationService.create(cancellationCreateDto);
  }

  @Get()
  async getAll() {
    return this.cancellationService.getAll();
  }

  @Get(':id')
  async getById(@Param() databaseMongooseIdDto: DatabaseMongooseIdDto) {
    return this.cancellationService.getById(databaseMongooseIdDto);
  }

  @Patch()
  async update(@Query() cancellationUpdateQueryDto: CancellationUpdateQueryDto,
               @Body() cancellationUpdateDto: CancellationUpdateDto) {
    return this.cancellationService.update(cancellationUpdateQueryDto, cancellationUpdateDto);
  }

  @Patch(':id')
  async updateById(@Param() databaseMongooseIdDto: DatabaseMongooseIdDto,
                   @Body() cancellationUpdateByIdDto: CancellationUpdateByIdDto) {
    return this.cancellationService.updateById(databaseMongooseIdDto, cancellationUpdateByIdDto);
  }

  @Delete(':id')
  async deleteById(@Param() databaseMongooseIdDto: DatabaseMongooseIdDto) {
    return this.cancellationService.deleteById(databaseMongooseIdDto);
  }
}
