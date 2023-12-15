import { Module } from '@nestjs/common';
import { TarifsUpdate } from './tarifs.update';
import { TarifsService } from './tarifs.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TarifModel } from './models/tarif.model';

@Module({
  controllers: [],
  providers: [TarifsService, TarifsUpdate],
  imports: [
    SequelizeModule.forFeature([TarifModel])
  ]
})
export class TarifsModule {}
