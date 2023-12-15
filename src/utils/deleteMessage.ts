import { Context } from "src/types/context.interface";

export async function deleteMessage(ctx: Context) {
  if (!ctx.session.lastMessagesId.length) return
  await ctx.session.lastMessagesId.forEach(async (messageId) => {
    try {
      await ctx.deleteMessage(messageId)
    } catch (error) {
      ctx.session.lastMessagesId = []
    }
  })

  ctx.session.lastMessagesId = []
}