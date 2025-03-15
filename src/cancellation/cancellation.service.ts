import { Injectable, NotFoundException } from '@nestjs/common';
import { CancellationCreateDto, CancellationUpdateDto, CancellationUpdateQueryDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cancellation } from './schema/cancellation.schema';
import { Model } from 'mongoose';
import { DatabaseMongooseIdDto } from '../database/dto';

@Injectable()
export class CancellationService {
  constructor(
    @InjectModel(Cancellation.name) private readonly cancellationModel: Model<Cancellation>
  ) {
  }

  async create(cancellationCreateDto: CancellationCreateDto) {
    return await this.cancellationModel.create(cancellationCreateDto)
  }

  async getAll() {
    return await this.cancellationModel.find().exec()
  }

  async getById(databaseMongooseIdDto: DatabaseMongooseIdDto) {
    const { id } = databaseMongooseIdDto
    const cancellation = await this.cancellationModel.findById(id).exec();
    if (!cancellation) throw new NotFoundException('Cancellation not found')
    return cancellation
  }

  async update(cancellationUpdateQueryDto: CancellationUpdateQueryDto,
               cancellationUpdateDto: CancellationUpdateDto) {
    return await this.cancellationModel
      .updateMany(cancellationUpdateQueryDto, cancellationUpdateDto, { new: true })
      .exec()
  }

  async deleteById(databaseMongooseIdDto: DatabaseMongooseIdDto) {
    const { id } = databaseMongooseIdDto
    return await this.cancellationModel
      .deleteOne({ _id: id })
      .exec()
  }
}
