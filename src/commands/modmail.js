import { SlashCommandBuilder, userMention } from "@discordjs/builders";

export const data = new SlashCommandBuilder()
  .setName("modmail")
  .setDescription("Send a message to the mod team. Can be anonymous.")
  .addStringOption(o => o
    .setName("message")
    .setDescription("Your message")
    .setRequired(true))
  .addBooleanOption(o => o
    .setName("anonymous")
    .setDescription("Whether you want to send the message anonymously."));

export const execute = async interaction => {
  const isAnon = interaction.options.getBoolean("anonymous");

  console.log("");

  return interaction.client.notice_channel
    .send({
      content:
        ":e_mail: " +
        `${isAnon ? "Anonymous" : userMention(interaction.user.id) }: ` +
        interaction.options.getString("message")
    })
    .then(interaction.reply({
      ephemeral: true,
      content: ":white_check_mark: Message sent."
    }));
};
