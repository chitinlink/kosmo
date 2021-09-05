import { fmt_plural } from "../utils/text.js";

export const name = "interactionCreate";
export const execute = async (client, interaction) => {
  if (!interaction.isSelectMenu()) return;
  if (interaction.customId !== "roleAdd") return;

  await interaction.member.roles.add(interaction.values
    .map(id => interaction.guild.roles.resolve(id)));

  await interaction.update({
    content: `:white_check_mark: Role${fmt_plural(interaction.values)} added!`,
    components: []
  });
};
