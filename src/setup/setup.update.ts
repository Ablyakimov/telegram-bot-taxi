import { Action, Command, InjectBot, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { listSetupButtons } from './setup.buttons';
import { Context } from 'src/types/context.interface';
import { deleteMessage } from 'src/utils/deleteMessage';
import { DirectionService } from 'src/direction/direction.service';

@Update()
export class SetupUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>, private readonly directionService: DirectionService) {}

  @Action('setup')
  @Command('setup')
  async setup(ctx: Context) {
    try {
      await deleteMessage(ctx);
      const { message_id } = await ctx.reply(
        'Выберите настройку, которую хотите изменить',
        listSetupButtons(),
      );
      ctx.session.lastMessagesId.push(message_id);
    } catch (error) {
      console.log(error);
    }
  }

  @Action('setup.reset')
  async resetSetup(ctx: Context) {
    try {
      ctx.session.omitTarifs = [];
      ctx.session.directionSettings = await this.directionService.getAllDirections()
      await ctx.reply('Настройки очищены');
    } catch (error) {
      console.log(error);
    }
  }
}
