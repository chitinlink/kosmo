import logger from "../logging.js";
import { fmt_guild, fmt_user } from "../utils/text.js";

export const name = "guildCreate";
export const execute = async (client, guild) => {
  logger.info(`${fmt_user(guild.me.user)} has been added to the guild ${fmt_guild(guild)}.`);
};
