import logger from "../logging.js";
import { fmt_message } from "../utils/text.js";

export const name = "messageUpdate";
export const execute = async (client, oldMessage, newMessage) => {
  logger.edited(fmt_message(newMessage));
};
