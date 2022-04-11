import logger from "../logging.js";
import { fmt_guild, fmt_user } from "../utils/text.js";
import { guild_id } from "../../config.js";

export const name = "ready";
export const once = true;
export const execute = async client => {
  const guilds = await client.guilds.fetch({ limit: 200 });

  logger.info(`Logged in as ${fmt_user(client.user)}, assigned to guild ${guild_id}.`);

  if (!guilds.has(guild_id)) {
    logger.warn(`${fmt_user(client.user)} is not a member of its assigned guild!`);
  }

  logger.info(`${fmt_user(client.user)} is currently a member of these guilds:`);
  guilds.forEach(guild => logger.info(
    `* ${fmt_guild(guild)}${guild.id === guild_id ? " (Assigned)" : ""}`));
};
