import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Petition } from './schema/petition.schema';
import { Model } from 'mongoose';
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
  ) {
  }

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
    const { id } = databaseMongooseIdDto;
    const petition = await this.petitionModel.findById(id).exec();
    if (!petition) throw new NotFoundException('Petition not found');
    return petition;
  }

  async update(petitionUpdateQueryDto: PetitionUpdateQueryDto,
               petitionUpdateDto: PetitionUpdateDto) {
    const { status, subject, description } = petitionUpdateQueryDto;
    return await this.petitionModel
      .updateMany({
        $and: [
          status ? { status } : {},
          subject ? { subject } : {},
          description ? { description } : {},
        ],
      }, petitionUpdateDto, { new: true })
      .exec()
  }

  async updateById(databaseMongooseIdDto: DatabaseMongooseIdDto,
                   petitionUpdateByIdDto: PetitionUpdateByIdDto) {
    const { id } = databaseMongooseIdDto;
    const petition = await this.petitionModel
      .findByIdAndUpdate(id, petitionUpdateByIdDto, { new: true })
      .exec();
    if (!petition) throw new NotFoundException('Petition not found');
    return petition;
  }

  async deleteById(databaseMongooseIdDto: DatabaseMongooseIdDto) {
    const { id } = databaseMongooseIdDto;
    const petition = await this.petitionModel
      .findByIdAndDelete(id)
      .exec();
    if (!petition) throw new NotFoundException('Petition not found');
    return petition;
  }

  async take(databaseMongooseIdDto: DatabaseMongooseIdDto) {
    return await this.updateById(databaseMongooseIdDto, {
      status: PetitionStatuses.inWork,
    });
  }

  async complete(databaseMongooseIdDto: DatabaseMongooseIdDto,
                 petitionCompleteDto: PetitionCompleteDto) {
    const { id } = databaseMongooseIdDto;
    const { resolutionText } = petitionCompleteDto;

    const updatedPetition = await this.updateById(databaseMongooseIdDto, {
      status: PetitionStatuses.completed,
    })
    const resolution = await this.resolutionService.create({
      petitionId: id,
      resolutionText,
    })

    return [updatedPetition, resolution]
  }

  async cancel(databaseMongooseIdDto: DatabaseMongooseIdDto,
               petitionCancelDto: PetitionCancelDto) {
    const { id } = databaseMongooseIdDto;
    const { cancellationText } = petitionCancelDto;

    const updatedPetition = await this.updateById(databaseMongooseIdDto, {
      status: PetitionStatuses.cancelled,
    })
    const cancellation = await this.cancellationService.create({
      petitionId: id,
      cancellationText,
    })

    return [updatedPetition, cancellation]
  }

  async cancelAllInWork(petitionCancelAllDto: PetitionCancelAllDto) {
    const { cancellationText } = petitionCancelAllDto
    const petitionsInWork = await this.petitionModel.find({status: PetitionStatuses.inWork})
    if (!petitionsInWork.length) throw new NotFoundException('Petitions in work not found');
    return await Promise.all(
      petitionsInWork.map(({ id }) => this.cancel({ id }, { cancellationText }))
    )
  }
}
