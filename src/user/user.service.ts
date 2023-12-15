import { Injectable } from '@nestjs/common';
import { UserModel } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel) private readonly userRepository: typeof UserModel) {}

  async registerAccount(account: IUser) {
    const findUser = await this.userRepository.findOne({where: {phone_number: account.phone_number}})
    if (!findUser) {
      await this.userRepository.create(account)
      return true      
    }
    return false
  }
}
