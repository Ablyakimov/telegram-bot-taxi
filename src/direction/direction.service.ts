import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DirectionModel } from './models/direction.model';
import { IDirection } from './models/direction.dto';
import { testDirection } from 'src/utils/testData';

@Injectable()
export class DirectionService {
  constructor(@InjectModel(DirectionModel) private readonly directionRepository: typeof DirectionModel) {}

  async loadAllDirection() {
    await testDirection.map(async (direction) => {
      await this.loadOneDirection(direction)
    })
  }

  async loadOneDirection(direction: IDirection) {
    await this.directionRepository.create(direction)
  }

  async getAllDirections() {
    return await this.directionRepository.findAll({order: [['id', 'ASC']]})
  }
}
