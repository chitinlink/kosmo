import { readdir } from "fs/promises";
import logger from "../logging.js";

export default async client => readdir(new URL("../commands", import.meta.url))
  .then(files => files
    .filter(f => f.endsWith(".js"))
    .forEach(async f => {
      const command = await import(`../commands/${f}`);
      client.commands.set(command.data.name, command);
    }))
  .then(() => logger.info("Loaded commands."));
