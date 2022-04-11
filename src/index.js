import { execSync } from "child_process";
import { access, writeFileSync, unlinkSync } from "fs";
import { Client, Collection, Intents } from "discord.js";
import logger from "./logging.js";
import deployCommands from "./setup/deployCommands.js";
import initCommands from "./setup/initCommands.js";
import initEvents from "./setup/initEvents.js";
import initDatabase from "./setup/initDatabase.js";
import deployCommandPermissions from "./setup/deployCommandPermissions.js";
import { guild_info } from "./utils/guild_info.js";
import { token, notice_channel_id, guild_id, mod_roles } from "../config.js";

// Command-line arguments
const args = process.argv.splice(2);

// Node process event logging
process.on("SIGINT", () => { logger.info("Caught SIGINT"); process.exit(); });
process.on("SIGTERM", () => { logger.info("Caught SIGTERM"); process.exit(); });
process.on("warning", w => logger.warn(w.stack));
process.on("exit", () => logger.info("Exiting."));

// process.on("uncaughtExceptionMonitor", err => {
//   logger.error(err.stack);
// });
// Workaround for https://github.com/winstonjs/winston/issues/1802
// Switch to commented out code above when fixed (?)
process.on("uncaughtException", (err) => {
  logger.error(err.stack);
  writeFileSync("./.crashed", "");
  logger.on("finish", () => process.exit(1));
});

logger.info("Starting...");

// discord.js client
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS
  ]
});

//#region Setup

// For use in /version
client.revision = execSync("git rev-parse HEAD").toString().trim();

// Command storage
client.commands = new Collection();

// Database access
client.db = new Collection();

// Log in
await client.login(token);

// Admin notice channel
client.notice_channel = await client.channels.fetch(notice_channel_id);

// Guild the bot is assigned to
client.assigned_guild = await client.guilds.fetch(guild_id);

// Mod roles
client.mod_roles = mod_roles;

// Register commands
await deployCommands();

// Initialize client.commands
await initCommands(client);

// Register command permissions
await deployCommandPermissions(client);

// Set event listeners
await initEvents(client);

// Initialize client.db
await initDatabase(client);

//#endregion Setup

// Warn mods if the bot crashed.
access("./.crashed", err => {
  if (!err) {
    // Dev switch to avoid spam
    if (!args.includes("--ignore-crashes")) {
      client.notice_channel.send({
        content: ":plunger: I crashed, and have restarted."
      });
    }
    unlinkSync("./.crashed");
  }
});

// Log guild info
await guild_info(client);

logger.info("Done with setup.");
