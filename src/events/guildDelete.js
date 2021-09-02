import logger from "../logging.js";
import { fmt_guild, fmt_user } from "../utils/text.js";

export const name = "guildDelete";
export const execute = async guild => {
  logger.info(`${fmt_user(guild.me.user)} has been removed from the guild ${fmt_guild(guild)}.`);
};
