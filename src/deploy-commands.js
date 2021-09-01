const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { client_id, guild_id, token } = require("./config.js");
const logger = require("./logging.js");

module.exports = async () => {
  const commands = [];
  const commandFiles = fs.readdirSync(`${__dirname}/commands`)
    .filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: "9" }).setToken(token);

  await rest.put(
    Routes.applicationGuildCommands(client_id, guild_id),
    { body: commands },
  )
    .then(cmds => logger.info(
      "Registered guild commands: " +
      cmds.map(c => c.name).join(", ")
    ))
    .catch(error => logger.error(error));
};
