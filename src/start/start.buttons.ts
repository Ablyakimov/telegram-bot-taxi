import { Markup } from "telegraf";

export function getContactButton() {
  return Markup.keyboard([
    Markup.button.contactRequest('Передать номер телефона'),
  ])
}