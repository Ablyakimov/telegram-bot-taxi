import { Module, forwardRef } from '@nestjs/common';
import { StartUpdate } from './start.update';
import { StartService } from './start.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { DirectionModel } from 'src/direction/models/direction.model';
import { DirectionModule } from 'src/direction/direction.module';

@Module({
  controllers: [],
  providers: [StartService, StartUpdate],
  imports: [
    forwardRef(() => DirectionModule),
    SequelizeModule.forFeature([DirectionModel])
  ]
})
export class StartModule {}
