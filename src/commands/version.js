import { SlashCommandBuilder, PermissionsBitField } from "discord.js";
import { execSync } from "child_process";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("version")
  .setDescription("Show Kosmo version information.")
  .setDefaultMemberPermissions(PermissionsBitField.Default)
  .setDMPermission(true);

export const execute = async interaction => {
  const { revision } = interaction.client;
  const last_updated = execSync("git log -1 --date=relative --format=%ad")
    .toString().trim();

  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel("Source code")
        .setURL("https://github.com/chitinlink/kosmo"));

  return interaction.reply({
    ephemeral: true,
    content: `Kosmo (commit \`${revision}\`) — Last updated ${last_updated}`,
    components: [row]
  });
};
