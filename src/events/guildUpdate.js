const logger = require("../logging.js");

module.exports = {
  name: "guildUpdate",
  async execute(oldGuild, newGuild) {
    if (oldGuild.name === newGuild.name) return;
    logger.info(`The guild ${oldGuild.name} has been renamed to ${newGuild.name}`);
  },
};
