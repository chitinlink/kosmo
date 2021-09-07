import { readdir } from "fs/promises";
import logger from "../logging.js";

export default async client => readdir(new URL("../commands", import.meta.url))
  .then(files => files
    .filter(f => f.endsWith(".js"))
    .map(async f => await import(`../commands/${f}`)))
  .then(async cmds => (await Promise.all(cmds))
    .filter(c => !c.data.defaultPermission)
    .forEach(async c => {
      (await client.assigned_guild.commands.fetch())
        .find(cmd => cmd.name === c.data.name)
        .permissions.set({ permissions: c.permissions(client) });
    }))
  .then(() => logger.info("Registered guild command permissions."));
