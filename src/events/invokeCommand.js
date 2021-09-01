const logger = require("../logging.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      logger.info(`Invoked command ${command.name}.`);
      await command.execute(interaction);
    }
    catch (error) {
      logger.error(`Error (${command.name})`);
      logger.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true
      });
    }
  },
};
