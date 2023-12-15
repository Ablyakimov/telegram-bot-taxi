import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersUpdate } from './orders.update';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderModel } from './models/order.model';

@Module({
  providers: [OrdersService, OrdersUpdate],
  imports: [
    SequelizeModule.forFeature([OrderModel])
  ]
})
export class OrdersModule {}
