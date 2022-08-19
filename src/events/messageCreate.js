import logger from "../logging.js";
import { fmt_message } from "../utils/text.js";
import { inspect } from "util";

export const name = "messageCreate";
export const execute = async (client, message) => {
  logger.message(fmt_message(message));

  if (message.attachments.size > 0)
    message.attachments.forEach(a => {
      logger.message(`  attachment: ${a.url}`);
      if (a.description) logger.message(`    alt-text: ${a.description}`);
    });
  if (message.stickers.size > 0)
    message.stickers.forEach(s => {
      logger.message(`  sticker: ${s.name} (${s.id})`);
      if (s.description) logger.message(`    alt-text: ${s.description}`);
    });
  if (message.embeds.length > 0)
    message.embeds.forEach(e => logger.message(`  embed: ${inspect(e, { depth: Infinity, compact: true, breakLength: Infinity })}`));
  if (message.components.length > 0)
    message.components.forEach(c => logger.message(`  component: ${inspect(c, { depth: Infinity, compact: true, breakLength: Infinity })}`));
};
