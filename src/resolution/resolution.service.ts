import { Injectable, NotFoundException } from '@nestjs/common';
import { ResolutionCreateDto, ResolutionUpdateByIdDto, ResolutionUpdateDto, ResolutionUpdateQueryDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Resolution } from './schema/resolution.schema';
import { Model } from 'mongoose';
import { DatabaseMongooseIdDto } from '../database/dto';

@Injectable()
export class ResolutionService {
  constructor(
    @InjectModel(Resolution.name) private readonly resolutionModel: Model<Resolution>,
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
    const { resolutionText, petitionId } = resolutionUpdateQueryDto
    return await this.resolutionModel
      .updateMany({
        $and: [
          resolutionText ? { resolutionText } : {},
          petitionId ? { petitionId } : {},
        ],
      }, resolutionUpdateDto, { new: true })
      .exec()
  }

  async updateById(databaseMongooseIdDto: DatabaseMongooseIdDto,
                   resolutionUpdateByIdDto: ResolutionUpdateByIdDto) {
    const { id } = databaseMongooseIdDto;
    const resolution = await this.resolutionModel
      .findByIdAndUpdate(id, resolutionUpdateByIdDto, { new: true })
      .exec();
    if (!resolution) throw new NotFoundException('Resolution not found');
    return resolution;
  }

  async deleteById(databaseMongooseIdDto: DatabaseMongooseIdDto) {
    const { id } = databaseMongooseIdDto
    const resolution = await this.resolutionModel
      .findByIdAndDelete(id)
      .exec();
    if (!resolution) throw new NotFoundException('Resolution not found');
    return resolution;
  }
}
