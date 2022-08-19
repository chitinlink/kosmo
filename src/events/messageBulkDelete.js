import logger from "../logging.js";
import { fmt_origin } from "../utils/text.js";

export const name = "messageBulkDelete";
export const execute = async (client, messages) => {
  logger.deleted(`${messages.size} messages deleted:`);
  messages.forEach(m => logger.deleted(`  ${fmt_origin(m)}: ${m.url}`));
};
