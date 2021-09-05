import logger from "../logging.js";
import { fmt_origin, fmt_plural } from "../utils/text.js";

export const name = "messageCreate";
export const execute = async (client, message) => {

  let msg = `${fmt_origin(message)}: `;

  if (message.attachments.size > 0)
    msg +=
      `(${message.attachments.size} attachment${fmt_plural(message.attachments.size)}) `;

  msg += message.content;

  logger.message(msg);

  if (message.attachments.size > 0) {
    message.attachments.forEach(a => logger.message(`  ${a.url}`));
  }
};
