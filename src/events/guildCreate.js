const logger = require("../logging.js");
const { fmt_guild } = require("../utils/text.js");

module.exports = {
  name: "guildCreate",
  async execute(guild) {
    logger.info(`${guild.me.user.tag} has been added to the guild ${fmt_guild(guild)}.`);
  },
};
