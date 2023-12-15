import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdate } from './user.update';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';

@Module({
  providers: [UserService, UserUpdate],
  imports: [
    SequelizeModule.forFeature([UserModel])
  ],

})
export class UserModule {}
