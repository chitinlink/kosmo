import { execSync } from "child_process";
import { Client, Collection, Intents } from "discord.js";
import { token } from "./config.js";
import logger from "./logging.js";
import deployCommands from "./setup/deployCommands.js";
import initCommands from "./setup/initCommands.js";
import initEvents from "./setup/initEvents.js";

process.on("SIGINT", () => { logger.info("Caught SIGINT"); process.exit(); });
process.on("SIGTERM", () => { logger.info("Caught SIGTERM"); process.exit(); });
process.on("warning", w => logger.warn(w.stack));
process.on("exit", () => logger.info("Exiting."));

logger.info("Starting...");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.revision = execSync("git rev-parse HEAD").toString().trim();
client.commands = new Collection();

Promise.all([deployCommands(), initCommands(client), initEvents(client)])
  .then(() => client.login(token))
  .catch(error => logger.error(error.stack));
