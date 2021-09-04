import { execSync } from "child_process";
import { Client, Collection, Intents } from "discord.js";
import logger from "./logging.js";
import { token, notice_channel_id } from "./config.js";
import deployCommands from "./setup/deployCommands.js";
import initCommands from "./setup/initCommands.js";
import initEvents from "./setup/initEvents.js";
import initDatabase from "./setup/initDatabase.js";

// Node process event logging
process.on("SIGINT", () => { logger.info("Caught SIGINT"); process.exit(); });
process.on("SIGTERM", () => { logger.info("Caught SIGTERM"); process.exit(); });
process.on("warning", w => logger.warn(w.stack));
process.on("exit", () => logger.info("Exiting."));

logger.info("Starting...");

// discord.js client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// For use in /version
client.revision = execSync("git rev-parse HEAD").toString().trim();

// Command storage
client.commands = new Collection();

// Database access
client.db = new Collection();

// Run all of these prerequisites before logging in
Promise.all([
  deployCommands(),
  initCommands(client),
  initEvents(client),
  initDatabase(client)
])
  .then(() => client.login(token))
  .then(async () => client.notice_channel = await client.channels
    .fetch(notice_channel_id))
  .catch(error => logger.error(error.stack));
