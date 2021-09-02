import logger from "../logging.js";
import { fmt_origin } from "../utils/text.js";

export const name = "interactionCreate";
export const execute = async interaction => {
  if (!interaction.isCommand())
    return;

  const command = interaction.client.commands.get(interaction.commandName);
  if (!command)
    return;

  // TODO add options to this using interaction.option.data
  // At the very least subcommandgroups and subcommands
  logger.info(
    `${fmt_origin(interaction)} invoked command: ` +
    `${interaction.commandName} `
  );

  command.execute(interaction)
    .catch(async (error) => {
      logger.error(`Error (${command.data.name})`);
      logger.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true
      });
    });
};
