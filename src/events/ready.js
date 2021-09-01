const logger = require("../logging.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    const guilds = await client.guilds.fetch({ limit: 200 });
    logger.info(`Logged in as ${client.user.tag}, a member of these guilds:`);
    guilds.forEach(guild => logger.info(`* ${guild.id} - ${guild.name}`));
  },
};
