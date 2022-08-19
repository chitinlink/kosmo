import { SlashCommandBuilder, PermissionsBitField, ChannelType } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("say")
  .setDescription("Give me voice!")
  .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
  .setDMPermission(false)
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

  if (channel && channel.type !== ChannelType.GuildText) return interaction.reply({
    ephemeral: true,
    content: "Invalid channel selected."
  });

  const sent = await (channel || interaction.channel).send(message);

  return interaction.reply({
    ephemeral: true,
    content: `Message sent: ${sent.url}`
  });
};
