import { readdirSync } from "fs";
import { execSync } from "child_process";
import { Client, Collection, Intents } from "discord.js";
import { token } from "./config.js";
import logger from "./logging.js";
import deploy_commands from "./deploy-commands.js";

logger.info("Deploying guild commands...");
deploy_commands();

logger.info("Setting up the client...");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.revision = execSync("git rev-parse HEAD").toString().trim();

const
  commandFiles = readdirSync(new URL("commands", import.meta.url)).filter(f => f.endsWith(".js")),
  eventFiles = readdirSync(new URL("events", import.meta.url)).filter(f => f.endsWith(".js"));

client.commands = new Collection();
for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
  const event = await import(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(token);
