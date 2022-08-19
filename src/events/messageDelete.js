import logger from "../logging.js";
import { fmt_origin } from "../utils/text.js";

export const name = "messageDelete";
export const execute = async (client, message) => {
  let msg = `${fmt_origin(message)}: ${message.id}`;
  logger.deleted(msg);
};
