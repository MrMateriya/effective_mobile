import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Petition } from './schema/petition.schema';
import { Model, Types } from 'mongoose';
import {
  PetitionCancelDto,
  PetitionCompleteDto,
  PetitionCreateDto,
  PetitionGetAllQueryDto,
  PetitionUpdateByIdDto,
  PetitionUpdateDto,
  PetitionUpdateQueryDto,
} from './dto';
import { DatabaseMongooseIdDto } from '../database/dto';
import { PetitionStatuses } from './types/petition.types';
import { ResolutionService } from '../resolution/resolution.service';
import { CancellationService } from '../cancellation/cancellation.service';

@Injectable()
export class PetitionService {
  constructor(
    @InjectModel(Petition.name) private readonly petitionModel: Model<Petition>,
    private readonly resolutionService: ResolutionService,
    private readonly cancellationService: CancellationService,
  ) {}

  async create(petitionCreateDto: PetitionCreateDto) {
    return await this.petitionModel.create(petitionCreateDto);
  }

  async getAll(petitionGetAllQueryDto: PetitionGetAllQueryDto) {
    const { start, end } = petitionGetAllQueryDto;

    return await this.petitionModel
      .find({
        $and: [
          start ? { createdAt: { $gte: start } } : {},
          end ? { createdAt: { $lte: end } } : {},
        ],
      })
      .exec();
  }

  async getById(databaseMongooseIdDto: DatabaseMongooseIdDto) {
    const { id } = databaseMongooseIdDto
    const petition = await this.petitionModel.findById(id).exec();
    if (!petition) throw new NotFoundException('Petition not found')
    return petition
  }

  async update(petitionUpdateQueryDto: PetitionUpdateQueryDto,
               petitionUpdateDto: PetitionUpdateDto) {
    return await this.petitionModel
      .updateMany(petitionUpdateQueryDto, petitionUpdateDto, { new: true })
      .exec();
  }

  async updateById(databaseMongooseIdDto: DatabaseMongooseIdDto,
                   petitionUpdateByIdDto: PetitionUpdateByIdDto) {
    const { id } = databaseMongooseIdDto
    return await this.petitionModel
      .updateOne({ _id: id }, petitionUpdateByIdDto, { new: true })
      .exec();
  }

  async deleteById(databaseMongooseIdDto: DatabaseMongooseIdDto) {
    const { id } = databaseMongooseIdDto
    return await this.petitionModel
      .deleteOne({ _id: id })
      .exec();
  }

  async take(databaseMongooseIdDto: DatabaseMongooseIdDto) {
    return await this.updateById(databaseMongooseIdDto, {
      status: PetitionStatuses.inWork
    })
  }

  async complete(databaseMongooseIdDto: DatabaseMongooseIdDto,
                 petitionCompleteDto: PetitionCompleteDto) {
    const { id } = databaseMongooseIdDto
    const { resolutionText } = petitionCompleteDto

    return await Promise.all([
      this.updateById(databaseMongooseIdDto, {
        status: PetitionStatuses.completed
      }),
      this.resolutionService.create({
        petitionId: id,
        resolutionText,
      })
    ])
  }

  async cancel(databaseMongooseIdDto: DatabaseMongooseIdDto,
               petitionCancelDto: PetitionCancelDto) {
    const { id } = databaseMongooseIdDto
    const { cancellationText } = petitionCancelDto

    return await Promise.all([
      this.updateById(databaseMongooseIdDto, {
        status: PetitionStatuses.cancelled
      }),
      this.cancellationService.create({
        petitionId: id,
        cancellationText,
      })
    ])
  }

  async cancelAllInWork() {
    // return await this.update({status: PetitionStatuses.inWork, })
  }
}
