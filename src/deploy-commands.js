import fs from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { client_id, guild_id, token } from "./config.js";
import logger from "./logging.js";

export default async () => {
  const commands = [];
  const commandFiles = fs.readdirSync(new URL("commands", import.meta.url))
    .filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = await import(`./commands/${file}`);
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
