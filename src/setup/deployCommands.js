import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { client_id, guild_id, token } from "../config.js";
import { readdir } from "fs/promises";
import logger from "../logging.js";
import { fmt_list } from "../utils/text.js";

const rest = new REST({ version: "10" }).setToken(token);

export default async () => readdir(new URL("../commands", import.meta.url))
  .then(files => files
    .filter(f => f.endsWith(".js"))
    .map(async f => (await import(`../commands/${f}`)).data.toJSON()))
  .then(async commands => rest.put(
    Routes.applicationGuildCommands(client_id, guild_id),
    { body: await Promise.all(commands) },
  ))
  .then(cmds => logger.info(
    "Registered guild commands: \n" +
    fmt_list(cmds.map(c => c.name))
  ));
