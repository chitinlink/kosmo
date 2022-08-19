import { Client, GatewayIntentBits } from "discord.js";
import { token, guild_id } from "../../config.js";

console.log("Logging in...");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
await client.login(token);

console.log("Deleting all commands...");

client.assigned_guild = await client.guilds.fetch(guild_id);
await client.assigned_guild.commands.set([]);
await client.application.commands.set([]);

console.log("Done.");
console.log("Note that command-specific permissions will need to be set up again.");

process.exit(0);
