import { readdir } from "fs/promises";
import logger from "../logging.js";

export default async client => readdir(new URL("../events", import.meta.url))
  .then(files => files
    .filter(f => f.endsWith(".js"))
    .forEach(async f => {
      const event = await import(`../events/${f}`);
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }
    }))
  .then(() => logger.info("Loaded events."));
