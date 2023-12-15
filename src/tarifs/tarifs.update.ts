import { Action, Hears, InjectBot, Update } from 'nestjs-telegraf';
import { Context } from 'src/types/context.interface';
import { Telegraf } from 'telegraf';
import { listTarifButtons } from './tarifs.buttons';
import { deleteMessage } from 'src/utils/deleteMessage';
import { TarifsService } from './tarifs.service';
import { testTarifs } from 'src/utils/testData';

@Update()
export class TarifsUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly tarifsService: TarifsService,
  ) {}

  @Action('setup.tarif')
  async setupTarif(ctx: Context) {
    try {
      await deleteMessage(ctx);
      const tarifs = await this.tarifsService.getAllTarifs();
      const { message_id } = await ctx.reply(
        'Если тариф включен, то вы будете получать по нему заказы. Для изменения нажмите на кнопку.',
        listTarifButtons(tarifs, ctx.session.omitTarifs),
      );
      ctx.session.lastMessagesId.push(message_id);
    } catch (error) {
      console.log(error);
    }
  }

  @Action(/setup.tarif.\w+/)
  async selectTarif(ctx: Context) {
    try {
      const cbQ: any = ctx.callbackQuery;
      const data: string = cbQ.data;
      const index = ctx.session.omitTarifs.indexOf(data);

      if (index !== -1) {
        ctx.session.omitTarifs.splice(index, 1);
      } else {
        ctx.session.omitTarifs.push(data);
      }

      const tarifs = await this.tarifsService.getAllTarifs();

      await ctx.editMessageText(
        'Если тариф включен, то вы будете получать по нему заказы. Для изменения нажмите на кнопку.',
        listTarifButtons(tarifs, ctx.session.omitTarifs),
      );
    } catch (error) {
      console.log(error);
    }
  }

  // @Hears('/loadTarifs')
  // async uploadAllTarifs(ctx: Context) {
  //   await this.tarifsService.uploadAllTarif(testTarifs)
  //   await ctx.reply('load tarifs complete')
  // }
}
