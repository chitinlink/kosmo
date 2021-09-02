import { SlashCommandBuilder } from "@discordjs/builders";
import { execSync } from "child_process";

export const data = new SlashCommandBuilder()
  .setName("version")
  .setDescription("Shows Kosmo version information.");
export const execute = async interaction => {
  const { revision } = interaction.client;
  const last_updated = execSync("git log -1 --date=relative --format=%ad")
    .toString().trim();

  return interaction.reply(
    `Kosmo (commit \`${revision}\`) — Last updated ${last_updated}\n` +
    ":minidisc: <https://github.com/technoabyss/kosmo>"
  );
}
