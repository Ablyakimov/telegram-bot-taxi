import { Markup } from 'telegraf';

export function listSetupButtons() {
  return Markup.inlineKeyboard(
    [
      Markup.button.callback('Настройка направлений', 'setup.direction'),
      Markup.button.callback('Фильтр по тарифам', 'setup.tarif'),
      Markup.button.callback('Сброс настроек', 'setup.reset'),
    ],
    {
      columns: 1,
    },
  );
}

