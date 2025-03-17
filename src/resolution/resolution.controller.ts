import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResolutionService } from './resolution.service';
import { ResolutionCreateDto, ResolutionUpdateByIdDto, ResolutionUpdateDto, ResolutionUpdateQueryDto } from './dto';
import { DatabaseMongooseIdDto } from '../database/dto';

@Controller('resolution')
export class ResolutionController {
  constructor(private readonly resolutionService: ResolutionService) {
  }

  @Post()
  async create(@Body() resolutionCreateDto: ResolutionCreateDto) {
    return this.resolutionService.create(resolutionCreateDto);
  }

  @Get()
  async getAll() {
    return this.resolutionService.getAll();
  }

  @Get(':id')
  async getById(@Param() databaseMongooseIdDto: DatabaseMongooseIdDto) {
    return this.resolutionService.getById(databaseMongooseIdDto);
  }

  @Patch()
  async update(@Query() resolutionUpdateQueryDto: ResolutionUpdateQueryDto,
               @Body() resolutionUpdateDto: ResolutionUpdateDto) {
    return this.resolutionService.update(resolutionUpdateQueryDto, resolutionUpdateDto);
  }

  @Patch(':id')
  async updateById(@Param() databaseMongooseIdDto: DatabaseMongooseIdDto,
                   @Body() resolutionUpdateByIdDto: ResolutionUpdateByIdDto) {
    return this.resolutionService.updateById(databaseMongooseIdDto, resolutionUpdateByIdDto);
  }

  @Delete(':id')
  async deleteById(@Param() databaseMongooseIdDto: DatabaseMongooseIdDto) {
    return this.resolutionService.deleteById(databaseMongooseIdDto);
  }
}
