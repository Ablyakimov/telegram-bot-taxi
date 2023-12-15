import { Markup } from "telegraf";

export function actionButton() {
  return Markup.inlineKeyboard([
    Markup.button.callback('Взять заказ', 'getorder'),
    Markup.button.url('Вопрос по заказу', 'https://t.me/ablyakimovremzi')
  ])
}

export function reloadOrdersButton() {
  return Markup.inlineKeyboard([
    Markup.button.callback('Обновить', 'activeorders')
  ])
}

export function ifDontHaveOrdersButton() {
  return Markup.inlineKeyboard([
    Markup.button.callback('Обновить', 'activeorders'),
    Markup.button.callback('Настройки', 'setup')
  ])
}