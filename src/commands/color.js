import { SlashCommandBuilder } from "@discordjs/builders";
import { fmt_list } from "../utils/text.js";
import { sample } from "lodash";

export const data = new SlashCommandBuilder()
  .setName("color")
  .setDescription("Set your color.")
  .setDefaultPermission(true)
  .addSubcommand(sub => sub
    .setName("set")
    .setDescription("List all colors.")
    .addRoleOption(o => o
      .setName("color")
      .setDescription("The color you want.")
      .setRequired(true)))
  .addSubcommand(sub => sub
    .setName("list")
    .setDescription("List all colors."))
  .addSubcommand(sub => sub
    .setName("random")
    .setDescription("Get a random color."));

export const execute = async interaction => {
  const colors_db = interaction.client.db.get("colors");
  await colors_db.read();

  if (colors_db.data.length === 0) return interaction.reply({
    ephemeral: true,
    content: "There are no colors."
  });

  const available_colors = await interaction.guild.roles.fetch()
    .then(colors => Array.from(colors.values())
      .filter(r => colors_db.data.indexOf(r.id) !== -1));

  const subcommand = interaction.options.getSubcommand(true);

  // color list
  if (subcommand === "list") {
    return interaction.reply({
      ephemeral: true,
      content: fmt_list(available_colors)
    });
  }

  // color set
  if (subcommand === "set") {
    const color = interaction.options.getRole("color");

    if (!available_colors.includes(color)) {
      return interaction.reply({
        ephemeral: true,
        content: "That's not a color."
      });
    }

    await interaction.member.roles.remove(available_colors
      .map(id => interaction.guild.roles.resolve(id)));

    await interaction.member.roles.add(color);

    return interaction.reply({
      ephemeral: true,
      content: `:white_check_mark: You are now ${color}!`
    });
  }

  // color random
  if (subcommand === "random") {
    await interaction.member.roles.remove(available_colors
      .map(id => interaction.guild.roles.resolve(id)));

    const color = sample(available_colors);

    await interaction.member.roles.add(color);

    return interaction.reply({
      ephemeral: true,
      content: `:white_check_mark: You are now ${color}!`
    });
  }
};
