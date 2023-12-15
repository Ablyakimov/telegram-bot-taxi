import { Action, Hears, InjectBot, Update } from 'nestjs-telegraf';
import { Context } from 'src/types/context.interface';
import { PaginationDirection } from 'src/utils/PaginationDirection';
import { deleteMessage } from 'src/utils/deleteMessage';
import { Telegraf } from 'telegraf';
import { DirectionService } from './direction.service';

@Update()
export class DirectionUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly directionService: DirectionService,
  ) {}

  @Action('setup.direction')
  async showAllDirection(ctx: Context) {
    try {
      deleteMessage(ctx);
      const pagination = new PaginationDirection({ ctx });
      const keyboard = pagination.keyboard();
      const { message_id } = await ctx.reply(
        'Направления, по которым вы получаете заказы, отмечены ✅. Чтобы изменить параметры, просто нажмите кнопку.',
        keyboard,
      );
      ctx.session.lastMessagesId.push(message_id);

      pagination.handleActions(this.bot);
    } catch (error) {
      console.log(error);
    }
  }

  @Hears('/loaddirection')
  async loadAllDirection(ctx: Context) {
    await this.directionService.loadAllDirection();
    await ctx.reply('all directions loaded');
  }
}
