const logger = require("../logging.js");
const { fmt_guild, fmt_user } = require("../utils/text.js");

module.exports = {
  name: "guildDelete",
  async execute(guild) {
    logger.info(`${fmt_user(guild.me.user)} has been removed from the guild ${fmt_guild(guild)}.`);
  },
};
