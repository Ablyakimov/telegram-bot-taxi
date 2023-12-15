import { Markup, Telegraf } from 'telegraf';
import { testDirection } from './testData';
import { IDirection } from 'src/direction/models/direction.dto';
import { Context } from 'src/types/context.interface';
import { deleteMessage } from './deleteMessage';

interface IDirectionForButton extends IDirection {}

export class PaginationDirection {
  _callbackStr: string;
  currentPage: number = 1;
  messages: {
    prev: string;
    next: string;
    firstPage: string;
    lastPage: string;
    backSettins: string;
    orders: string;
    text: string;
  } = {
    next: '➡️',
    prev: '⬅️',
    firstPage: '❗️ Это первая страница',
    lastPage: '❗️ Это последняя страница',
    backSettins: '↖️ Настройки',
    orders: 'Актуальные заказы',
    text: 'Направления, по которым вы получаете заказы, отмечены ✅. Чтобы изменить параметры, просто нажмите кнопку.',
  };
  total: number;
  totalPages: number;
  data: IDirection[];
  pageSize: number = 9;
  ctx: Context;
  selectItem: string;
  writeMode: boolean;

  constructor({ ctx }) {
    this.ctx = ctx;
    this.data = ctx.session.directionSettings;
    this.total = this.data.length;
    this.totalPages = Math.ceil(this.total / this.pageSize);
    this._callbackStr = Math.random().toString(36).slice(2)
  }

  getOneButtonDirection(direction: IDirectionForButton) {
    return Markup.button.callback(
      `${direction.directionName} ${direction.isSelect ? '⛔️' : '✅'}, от ${
        direction.directionFrom
      }р `,
      direction.directionCode,
    );
  }

  getKeyboard(data) {
    const keyboard = []
    data.forEach((direction: IDirection) => {
      keyboard.push([this.getOneButtonDirection(direction)]);
      if (direction.directionCode === this.selectItem) {
        keyboard.push([
          Markup.button.callback(
            `${!direction.isSelect ? '⛔️Выключить' : '✅Включить'}`,
            'setup.direction.toggle',
          ),
          Markup.button.callback('Сумма заказа, от', 'setup.direction.from'),
        ]);
      }
    });

    keyboard.push([this.getButton(this.messages.orders, 'activeorders')]);

    const row = [];

    if (this.currentPage !== 1) {
      row.push(this.getButton(this.messages.prev, `${this._callbackStr}-prev`));
    }

    row.push(this.getButton(this.messages.backSettins, `setup`));

    if (this.currentPage !== this.totalPages) {
      row.push(this.getButton(this.messages.next, `${this._callbackStr}-next`));
    }
    keyboard.push(row);
    
    return Markup.inlineKeyboard(keyboard);
  }

  handleActions(composer: Telegraf<Context>) {
    
    composer.action(new RegExp(this._callbackStr + '-(.+)'), async (ctx) => {
      let data = ctx.match[1];
      let keyboard;
      
      switch (data) {
        case 'prev':
          if (this.currentPage <= 1) {
            return await ctx.answerCbQuery(this.messages.firstPage);
          }
          this.currentPage = this.currentPage - 1;
          keyboard = await this.keyboard();
          await ctx.editMessageText(this.messages.text, {
            ...keyboard,
            parse_mode: 'HTML',
          });
          break;
        case 'next':
          if (this.currentPage >= this.totalPages) {
            return await ctx.answerCbQuery(this.messages.lastPage);
          }
          this.currentPage = this.currentPage + 1;
          keyboard = await this.keyboard();
          await ctx.editMessageText(this.messages.text, {
            ...keyboard,
            parse_mode: 'HTML',
          });
          break;
      }
    });

    composer.action(/setup.direction.\w+/, async (ctx: Context) => {
      const cbQ: any = ctx.callbackQuery;
      const data: string = cbQ.data;

      if (data === 'setup.direction.toggle') {
        const index = ctx.session.directionSettings.findIndex(direction => direction.directionCode === this.selectItem)
        ctx.session.directionSettings[index].isSelect = !ctx.session.directionSettings[index].isSelect

        await ctx.editMessageText(this.messages.text, {
          ...this.keyboard(),
          parse_mode: 'HTML',
        });
        return
      } 
      if (data === 'setup.direction.from') {
        this.writeMode = true
      
        await ctx.reply('Напишите сумму, больше которой вы хотите получать заказы')
        return
      }

      if(this.selectItem === data) {
        this.selectItem = ''
      } else {
        this.selectItem = data;
      }


      await ctx.editMessageText(this.messages.text, {
        ...this.keyboard(),
        parse_mode: 'HTML',
      });

    });

    composer.on('message' ,async (ctx: Context) => {
      let message: any = ctx.message
      let text:string =  message.text
      if (this.writeMode) {
        const index = ctx.session.directionSettings.findIndex(direction => direction.directionCode === this.selectItem)
        ctx.session.directionSettings[index].directionFrom = +text
        this.writeMode = false

        deleteMessage(ctx)
        const {message_id} = await ctx.reply(this.messages.text, {
          ...this.keyboard(),
          parse_mode: 'HTML',
        });
        ctx.session.lastMessagesId.push(message_id)
      }

    })
  }
  keyboard() {
    const currentPageData = this.getPageData(
      this.data,
      this.currentPage,
      this.pageSize,
    );

    return this.getKeyboard(currentPageData);
  }

  getButton(text, callback_data, hide = false) {
    return { text, callback_data, hide };
  }

  getPageData(data, page, pageSize) {
    return data.slice((page - 1) * pageSize, page * pageSize);
  }
}
