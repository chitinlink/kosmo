import { readdir } from "fs/promises";
import { execSync } from "child_process";
import { Client, Collection, Intents } from "discord.js";
import { token } from "./config.js";
import logger from "./logging.js";
import deploy_commands from "./deploy-commands.js";

logger.info("Starting...");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.revision = execSync("git rev-parse HEAD").toString().trim();
client.commands = new Collection();

const setup_tasks = [
  // Register commands on discord's side
  deploy_commands(),

  // Commands
  readdir(new URL("commands", import.meta.url))
    .then(files => files
      .filter(f => f.endsWith(".js"))
      .forEach(async f => {
        const command = await import(`./commands/${f}`);
        client.commands.set(command.data.name, command);
      }))
    .then(() => logger.info("Loaded commands.")),

  // Events
  readdir(new URL("events", import.meta.url))
  .then(files => files
    .filter(f => f.endsWith(".js"))
    .forEach(async f => {
      const event = await import(`./events/${f}`);
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }
    }))
  .then(() => logger.info("Loaded events."))
];

Promise.all(setup_tasks)
  .then(() => client.login(token));
