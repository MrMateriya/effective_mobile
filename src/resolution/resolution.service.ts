import { Injectable, NotFoundException } from '@nestjs/common';
import { ResolutionCreateDto, ResolutionUpdateDto, ResolutionUpdateQueryDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Resolution } from './schema/resolution.schema';
import { Model } from 'mongoose';
import { DatabaseMongooseIdDto } from '../database/dto';

@Injectable()
export class ResolutionService {
  constructor(
    @InjectModel(Resolution.name) private readonly resolutionModel: Model<Resolution>
  ) {}

  async create(resolutionCreateDto: ResolutionCreateDto) {
    return await this.resolutionModel.create(resolutionCreateDto)
  }

  async getAll() {
    return await this.resolutionModel.find().exec()
  }

  async getById(databaseMongooseIdDto: DatabaseMongooseIdDto) {
    const { id } = databaseMongooseIdDto
    const resolution = await this.resolutionModel.findById(id).exec();
    if (!resolution) throw new NotFoundException('Resolution not found')
    return resolution
  }

  async update(resolutionUpdateQueryDto: ResolutionUpdateQueryDto,
               resolutionUpdateDto: ResolutionUpdateDto) {
    return await this.resolutionModel
      .updateMany(resolutionUpdateQueryDto, resolutionUpdateDto, { new: true })
      .exec()
  }

  async deleteById(databaseMongooseIdDto: DatabaseMongooseIdDto) {
    const { id } = databaseMongooseIdDto
    return await this.resolutionModel
      .deleteOne({ _id: id })
      .exec()
  }
}
