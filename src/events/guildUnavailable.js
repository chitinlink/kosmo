import logger from "../logging.js";
import { fmt_guild } from "../utils/text.js";

export const name = "guildUnavailable";
export const execute = async (client, guild) => {
  logger.info(`The guild ${fmt_guild(guild)} is currently unavailable.`);
};
