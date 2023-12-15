import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderModel } from './models/order.model';
import { IOrder } from './models/order.dto';
import { Op } from 'sequelize';
import * as moment from 'moment-timezone'
import { getMoscowTime } from 'src/utils/time';
import { IDirection } from 'src/direction/models/direction.dto';


@Injectable()
export class OrdersService {
  constructor(@InjectModel(OrderModel) private readonly orderRepository: typeof OrderModel) {}

  async getAllOrders() {
    return this.orderRepository.findAll()
  }

  async getActiveOrders(omitTarifs: Array<string>, directionSettings: Array<IDirection>) {

    const activeDirectionSettings = directionSettings.filter((direction) => !direction.isSelect)
    const disableDirectionSettings = directionSettings.filter((direction) => direction.isSelect)

    const date = await this.orderRepository.findAll({
      where: {
        [Op.and]: [
          {
            tarifCode: { [Op.and]: omitTarifs.map((tarif) => ({[Op.ne]: tarif})) },
          },
          {
            date: { [Op.gt]:  getMoscowTime().format()}
          },
          {
            fromCode: { [Op.and]: disableDirectionSettings.map((direction) => ({[Op.ne]: direction.directionCode}))  }
          },
        ]
      }
    })
    const returnDate = []
    date.forEach((order) => {
      const index = activeDirectionSettings.findIndex(direction => direction.directionCode === order.fromCode)
      
      if (activeDirectionSettings[index].directionFrom <= order.price) {
        returnDate.push(order)
      }
    })
    
    return returnDate
  }

  async createOrder(order: IOrder) {
    await this.orderRepository.create(order)
  }

  async createAllOrders(orders: IOrder[]) {
    await orders.forEach(async (order:IOrder) => {
      await this.createOrder(order)
    })
  }

}
