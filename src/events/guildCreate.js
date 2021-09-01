const logger = require("../logging.js");
const { fmt_guild, fmt_user } = require("../utils/text.js");

module.exports = {
  name: "guildCreate",
  async execute(guild) {
    logger.info(`${fmt_user(guild.me.user)} has been added to the guild ${fmt_guild(guild)}.`);
  },
};
