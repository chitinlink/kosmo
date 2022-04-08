# Kosmoceratidae

Server utilities bot. Uses [discord.js](https://discord.js.org/), on Discord API v10, with application commands.

Tested on Node.js v16.6.1.

## Running

### Discord Application

1. Set up a new [Discord Application](https://discord.com/developers/applications/) with a bot
2. Give it the Server Members Intent
3. Invite it to your server with `bot` and `applications.commands` scopes

### Bot

1. Copy `src/config.js.schema` into `src/config.js` and fill it in
2. `npm i`
3. `npm install pm2@latest -g`

Start: `npm run start`

Stop: `npm run stop`

See also [how to have it run on machine reboot](https://pm2.keymetrics.io/docs/usage/startup/).
