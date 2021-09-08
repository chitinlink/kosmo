import { SlashCommandBuilder } from "@discordjs/builders";
import { mod_roles } from "../utils/permissions.js";

export const permissions = mod_roles;

export const data = new SlashCommandBuilder()
  .setName("say")
  .setDescription("Give me voice!")
  .setDefaultPermission(false)
  .addStringOption(o => o
    .setName("message")
    .setDescription("The words I'll speak.")
    .setRequired(true))
  .addChannelOption(o => o
    .setName("channel")
    .setDescription("Where I should say it."));

export const execute = async interaction => {
  const message = interaction.options.getString("message");
  const channel = interaction.options.getChannel("channel");

  if (channel && !channel.isText()) return interaction.reply({
    ephemeral: true,
    content: "Invalid channel selected."
  });

  await (channel || interaction.channel).send(message);

  return interaction.reply({
    ephemeral: true,
    content: "Message sent."
  });
};
