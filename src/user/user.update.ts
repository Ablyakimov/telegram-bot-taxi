import { InjectBot, On, Update } from 'nestjs-telegraf';
import { Markup, Telegraf } from 'telegraf';
import { UserService } from './user.service';

import { Context } from 'src/types/context.interface';
import { deleteMessage } from 'src/utils/deleteMessage';

@Update()
export class UserUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly userService: UserService,
  ) {}

  @On('contact')
  async shareContact(ctx: Context) {
    try {
      await deleteMessage(ctx);
      const msg: any = ctx.message;
      const { phone_number, first_name }: IUser = msg.contact;

      if (
        await this.userService.registerAccount({ phone_number, first_name })
      ) {
        ctx.session.phone_number = phone_number;
        const { message_id } = await ctx.reply('Вы зарегестрированы!');
        ctx.session.lastMessagesId.push(message_id);
      } else {
        const { message_id } = await ctx.reply('Вы уже были зарегистрированы!');
        ctx.session.lastMessagesId.push(message_id);
      }

      await Markup.removeKeyboard();
    } catch (error) {
      console.log(error);
    }
  }
}
