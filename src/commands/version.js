const { SlashCommandBuilder } = require("@discordjs/builders");
const { execSync } = require("child_process");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("version")
    .setDescription("Shows Kosmo version information."),
  async execute(interaction) {
    const { version } = interaction.client;
    const last_updated = execSync("git log -1 --date=relative --format=%ad")
      .toString().trim();

    return interaction.reply(
      `Kosmo (commit \`${version}\`) — Last updated ${last_updated}\n` +
      ":minidisc: https://github.com/technoabyss/kosmo"
    );
  },
};
