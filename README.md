# Kosmo

Server utilities bot. Uses [discord.js](https://discord.js.org/), on Discord API v10, with application commands.

Tested on Node.js v16.6.1.

## Running

### Discord Application

1. Set up a new [Discord Application](https://discord.com/developers/applications/) with a bot
2. Give it the Server Members Intent
3. Invite it to your server with `bot` and `applications.commands` scopes
4. Restrict the `/manage` and `/say`

### Run

Copy `config.js.schema` into `config.js`, fill it in, `npm i`

To run the bot: `npm run start`

To delete all bot commands (to clean up): `npm run reset_commands`

To start the bot with [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/): `pm2 start src/index.js --name Kosmo`  
See also [how to have it run on machine reboot](https://pm2.keymetrics.io/docs/usage/startup/).

Logs available at `logs/`, data stored at `data/`.

### Develop

While developing, use the `--ignore-crashes` flag to avoid spamming your notice channel with warnings:
```sh
npm run start -- --ignore-crashes
```
