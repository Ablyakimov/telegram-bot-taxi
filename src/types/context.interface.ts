import { IDirection } from "src/direction/models/direction.dto";
import { Context as ContextTelegraf } from "telegraf";

export interface Context extends ContextTelegraf {
  session: {
    phone_number: string
    omitTarifs: Array<string>
    lastMessagesId: Array<number>
    directionSettings: IDirection[]
  }
}