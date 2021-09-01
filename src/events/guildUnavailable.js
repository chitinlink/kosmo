const logger = require("../logging.js");
const { fmt_guild } = require("../utils/text.js");

module.exports = {
  name: "guildUnavailable",
  async execute(guild) {
    logger.info(`The guild ${fmt_guild(guild)} is currently unavailable.`);
  },
};
