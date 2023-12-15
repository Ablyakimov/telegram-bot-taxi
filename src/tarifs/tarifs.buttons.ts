import { ITarif } from 'src/tarifs/models/tarif.dto';
import { Markup } from 'telegraf';

export function listTarifButtons(
  listOfTarif: ITarif[],
  omitTarifs: Array<string>,
) {
  const listButtons = [];
  listOfTarif.map((tarifItem): any => {
    const index = omitTarifs.indexOf(tarifItem.dataBtn);

    if (index !== -1) {
      listButtons.push(
        Markup.button.callback('⛔️' + ` ${tarifItem.name}`, tarifItem.dataBtn),
      );
    } else {
      listButtons.push(
        Markup.button.callback('✅' + `${tarifItem.name}`, tarifItem.dataBtn),
      );
    }
  });

  listButtons.push(Markup.button.callback('Актуальные заказы', 'activeorders'));
  listButtons.push(Markup.button.callback('Назад', 'setup'));

  return Markup.inlineKeyboard(listButtons, {
    columns: 1,
  });
}
