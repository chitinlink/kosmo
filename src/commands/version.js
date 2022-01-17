import { SlashCommandBuilder } from "@discordjs/builders";
import { execSync } from "child_process";
import { MessageActionRow, MessageButton } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("version")
  .setDescription("Show Kosmo version information.")
  .setDefaultPermission(true);

export const execute = async interaction => {
  const { revision } = interaction.client;
  const last_updated = execSync("git log -1 --date=relative --format=%ad")
    .toString().trim();

  const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setStyle("LINK")
        .setLabel("Source code")
        .setURL("https://github.com/chitinlink/kosmo"));

  return interaction.reply({
    ephemeral: true,
    content: `Kosmo (commit \`${revision}\`) — Last updated ${last_updated}`,
    components: [row]
  });
};
