const logger = require("../logging.js");
const { fmt_guild } = require("../utils/text.js");

module.exports = {
  name: "guildDelete",
  async execute(guild) {
    logger.info(`${guild.me.user.tag} has been removed from the guild ${fmt_guild(guild)}.`);
  },
};
