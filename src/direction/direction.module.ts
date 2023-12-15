import { Module } from '@nestjs/common';
import { DirectionService } from './direction.service';
import { DirectionUpdate } from './direction.update';
import { SequelizeModule } from '@nestjs/sequelize';
import { DirectionModel } from './models/direction.model';

@Module({
  controllers: [],
  providers: [DirectionService, DirectionUpdate],
  imports: [
    SequelizeModule.forFeature([DirectionModel])
  ],
  exports: [DirectionService]
})
export class DirectionModule {}
