import logger from "../logging.js";

export const name = "guildUpdate";
export const execute = async (client, oldGuild, newGuild) => {
  if (oldGuild.name === newGuild.name) return;
  logger.info(`The guild ${oldGuild.name} has been renamed to ${newGuild.name} (${newGuild.id})`);
};
