const logger = require("../logging.js");
const { fmt_guild, fmt_user } = require("../utils/text.js");
const { guild_id } = require("../config.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    const guilds = await client.guilds.fetch({ limit: 200 });

    logger.info(`Logged in as ${fmt_user(client.user)}, assigned to guild ${guild_id}.`);

    if (!guilds.has(guild_id)) {
      logger.warn(`${fmt_user(client.user)} is not a member of its assigned guild!`);
    }

    logger.info(`${fmt_user(client.user)} is currently a member of these guilds:`);
    guilds.forEach(guild => logger.info(
      `* ${fmt_guild(guild)}${guild.id === guild_id ? " (Assigned)" : ""}`));
  },
};
