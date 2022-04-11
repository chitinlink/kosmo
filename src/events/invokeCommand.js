import logger from "../logging.js";
import { fmt_origin } from "../utils/text.js";

const pp = options => options
  .map(o => {
    if (o.value) { return `${o.name}:${o.value}`; }
    else if (o.options) { return `${o.name} ${pp(o.options)}`; }
    else { return o.name; }
  })
  .join(" ");

export const name = "interactionCreate";
export const execute = async (client, interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  let cmd = interaction.commandName;
  if (interaction.options.data) cmd += ` ${pp(interaction.options.data)}`;
  logger.command(`${fmt_origin(interaction)}: /` + cmd);

  command.execute(interaction)
    .catch(async (error) => {
      logger.error(`(${command.data.name}) ${error.stack}`);
      await interaction.reply({
        content: "There was an error while executing this command, sorry! Bother an admin about it!",
        ephemeral: true
      });
    });
};
