import { execSync } from "child_process";
import { access, writeFileSync, unlinkSync } from "fs";
import { Client, Collection, GatewayIntentBits } from "discord.js";
import logger from "./logging.js";
import deployCommands from "./setup/deployCommands.js";
import initCommands from "./setup/initCommands.js";
import initEvents from "./setup/initEvents.js";
import initDatabase from "./setup/initDatabase.js";
import { log_guild_info } from "./utils/log_guild_info.js";
import { token, notice_channel_id, guild_id, membership_role_id } from "../config.js";

// Command-line arguments
const args = process.argv.splice(2);

// Node process event logging
process.on("SIGINT", () => { logger.info("Caught SIGINT"); process.exit(); });
process.on("SIGTERM", () => { logger.info("Caught SIGTERM"); process.exit(); });
process.on("warning", w => logger.warn(w.stack));
process.on("exit", () => logger.info("Exiting."));

process.on("uncaughtExceptionMonitor", error => {
  logger.error(error.stack);
  writeFileSync("./.crashed", "");
  process.exit(1);
});

logger.info("Starting...");

// discord.js client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
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

// Guild the bot is assigned to
client.assigned_guild = await client.guilds.fetch(guild_id);

// Admin notice channel
client.notice_channel = await client.channels.fetch(notice_channel_id);

// Guild member role
client.membership_role = await client.assigned_guild.roles.fetch(membership_role_id);

// Register commands
await deployCommands();

// Initialize client.commands
await initCommands(client);

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
await log_guild_info(client);

logger.info("Done with setup.");
