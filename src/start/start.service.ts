import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DirectionModel } from 'src/direction/models/direction.model';

@Injectable()
export class StartService {}