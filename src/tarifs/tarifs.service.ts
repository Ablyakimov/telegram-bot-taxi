import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TarifModel } from './models/tarif.model';
import { ITarif } from './models/tarif.dto';

@Injectable()
export class TarifsService {
  constructor(@InjectModel(TarifModel) private readonly tarifRepository: typeof TarifModel) {}

  async getAllTarifs() {
    return this.tarifRepository.findAll()
  }

  private async uploadOneTarif(tarif: ITarif) {
    await this.tarifRepository.create(tarif)
  }

  async uploadAllTarif(tarifs: ITarif[]) {
    await tarifs.forEach(async (tarif) => {
      await this.uploadOneTarif(tarif)
    })
  }
}
