import { InjectBot, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { getContactButton } from './start.buttons';

import { Context } from 'src/types/context.interface';
import { deleteMessage } from 'src/utils/deleteMessage';
import { DirectionService } from 'src/direction/direction.service';

@Update()
export class StartUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly directionService: DirectionService,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    ctx.session.directionSettings = await this.directionService.getAllDirections();
    ctx.session.omitTarifs = [];
    ctx.session.lastMessagesId = [];
    await deleteMessage(ctx);
    const { message_id } = await ctx.reply(
      "Для продолжения работы нажмите кнопку 'Передать номер телефона'",
      getContactButton(),
    );
    ctx.session.lastMessagesId.push(message_id);
  }
}
