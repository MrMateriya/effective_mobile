import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CancellationService } from './cancellation.service';
import { CancellationCreateDto, CancellationUpdateDto, CancellationUpdateQueryDto } from './dto';
import { DatabaseMongooseIdDto } from '../database/dto';

@Controller('cancellation')
export class CancellationController {
  constructor(
    private readonly cancellationService: CancellationService
  ) {}

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

  @Delete(':id')
  async deleteById(@Param() databaseMongooseIdDto: DatabaseMongooseIdDto) {
    return this.cancellationService.deleteById(databaseMongooseIdDto);
  }
}
