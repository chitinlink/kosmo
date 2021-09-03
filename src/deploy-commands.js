import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { client_id, guild_id, token } from "./config.js";
import { readdir } from "fs/promises";

export default async () => {
  const rest = new REST({ version: "9" }).setToken(token);

  return readdir(new URL("commands", import.meta.url))
    .then(files => files
      .filter(f => f.endsWith(".js"))
      .map(async f => (await import(`./commands/${f}`)).data.toJSON()))
    .then(async commands => rest.put(
      Routes.applicationGuildCommands(client_id, guild_id),
      { body: await Promise.all(commands) },
    ));
};
