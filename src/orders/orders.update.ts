import { Action, Command, Hears, InjectBot, On, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { actionButton, ifDontHaveOrdersButton } from './orders.buttons';
import { Context } from 'src/types/context.interface';
import { deleteMessage } from 'src/utils/deleteMessage';
import { OrdersService } from './orders.service';
import { testOrders } from 'src/utils/testData';
import { IOrder } from './models/order.dto';
import { getDateAndTime } from 'src/utils/time';

@Update()
export class OrdersUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly ordersService: OrdersService,
  ) {}

  @Action('activeorders')
  @Command('activeorders')
  async showAllActiveOrders(ctx: Context) {
    try {
      if (!ctx.session.phone_number) return
      await deleteMessage(ctx);
      const { omitTarifs, directionSettings } = ctx.session;
      const orders = await this.ordersService.getActiveOrders(
        omitTarifs,
        directionSettings,
      );

      if (orders.length === 0) {
        ctx.reply(
          'Актуальных заказов по вашим настройкам нет',
          ifDontHaveOrdersButton(),
        );
      }

      ctx.session.lastMessagesId = await Promise.all(
        orders.map(
          async ({
            date: dateFromDb,
            fromName,
            to,
            numberOrder,
            passenger,
            price,
            tarifName,
          }: IOrder) => {
            const { date, time } = getDateAndTime(dateFromDb);
            const { message_id } = await ctx.reply(
              `${date} ${time} ${fromName} - ${to} ${tarifName} ${price}₽ Пассажиры: ${passenger} №${numberOrder}`,
              actionButton(),
            );
            return message_id;
          },
        ),
      );
    } catch (error) {
      console.log(error);
    }
  }

  @Hears('/loadorders')
  async uploadAllTestOrders(ctx: Context) {
    await this.ordersService.createAllOrders(testOrders);
    await ctx.reply('load orders complete');
  }

  // @Hears('/loadOneOrder')
  // async uploadOneTestOrder(ctx: Context) {
  //   await this.ordersService.createOrder()
  //   await ctx.reply('load order complete')
  // }
}
