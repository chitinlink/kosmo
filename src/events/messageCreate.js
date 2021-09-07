import logger from "../logging.js";
import { fmt_origin, fmt_plural } from "../utils/text.js";
import { inspect } from "util";

export const name = "messageCreate";
export const execute = async (client, message) => {

  let msg = `${fmt_origin(message)}: `;

  // console.log(message);

  let extras = [];
  if (message.attachments.size > 0)
    extras.push(`${message.attachments.size} attachment${fmt_plural(message.attachments.size)}`);
  if (message.embeds.length > 0)
    extras.push(`${message.embeds.length} embed${fmt_plural(message.embeds.length)}`);
  if (message.components.length > 0)
    extras.push(`${message.components.length} component${fmt_plural(message.components.length)}`);
  if (extras.length > 0) msg += `(${extras.join(", ")}) `;

  msg += message.content;

  logger.message(msg);

  if (message.attachments.size > 0)
    message.attachments.forEach(a => logger.message(`  attachment: ${a.url}`));
  if (message.embeds.length > 0)
    message.embeds.forEach(e => logger.message(`  embed: ${inspect(e, { depth: Infinity, compact: true, breakLength: Infinity })}`));
  if (message.components.length > 0)
    message.components.forEach(c => logger.message(`  component: ${inspect(c, { depth: Infinity, compact: true, breakLength: Infinity })}`));
};
