import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { client_id, token } from "../../config.js";
import { readdir } from "fs/promises";
import { fmt_list } from "../utils/text.js";

console.log("Registering global commands...");

const rest = new REST({ version: "10" }).setToken(token);

await readdir(new URL("../commands/global", import.meta.url))
  .then(files => files
    .filter(f => f.endsWith(".js"))
    .map(async f => (await import(`../commands/global/${f}`)).data.toJSON()))
  .then(async commands => rest.put(
    Routes.applicationCommands(client_id),
    { body: await Promise.all(commands) },
  ))
  .then(cmds => console.log(
    "Registered global commands: \n" +
    fmt_list(cmds.map(c => c.name))
  ));
