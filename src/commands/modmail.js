import { SlashCommandBuilder, PermissionsBitField } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("modmail")
  .setDescription("Send a message to the mod team. Can be anonymous.")
  .setDefaultMemberPermissions(PermissionsBitField.Default)
  .setDMPermission(false)
  .addStringOption(o => o
    .setName("message")
    .setDescription("Your message")
    .setRequired(true))
  .addBooleanOption(o => o
    .setName("anonymous")
    .setDescription("Whether you want to send the message anonymously."));

export const execute = async interaction => {
  const isAnon = interaction.options.getBoolean("anonymous") || false;

  return interaction.client.notice_channel
    .send({
      content:
        ":e_mail: " +
        `${isAnon ? "Anonymous" : interaction.user }: ` +
        interaction.options.getString("message")
    })
    .then(interaction.reply({
      ephemeral: true,
      content: ":white_check_mark: Message sent."
    }));
};
