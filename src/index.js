import { execSync } from "child_process";
import { Client, Collection, Intents } from "discord.js";
import logger from "./logging.js";
import deployCommands from "./setup/deployCommands.js";
import initCommands from "./setup/initCommands.js";
import initEvents from "./setup/initEvents.js";
import initDatabase from "./setup/initDatabase.js";
import deployCommandPermissions from "./setup/deployCommandPermissions.js";
import { token, notice_channel_id, guild_id, mod_roles } from "./config.js";

// Node process event logging
process.on("SIGINT", () => { logger.info("Caught SIGINT"); process.exit(); });
process.on("SIGTERM", () => { logger.info("Caught SIGTERM"); process.exit(); });
process.on("warning", w => logger.warn(w.stack));
process.on("exit", () => logger.info("Exiting."));

logger.info("Starting...");

// discord.js client
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS
  ]
});

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
