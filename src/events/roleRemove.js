import { fmt_plural } from "../utils/text.js";

export const name = "interactionCreate";
export const execute = async interaction => {
  if (!interaction.isSelectMenu()) return;
  if (interaction.customId !== "roleRemove") return;

  await interaction.member.roles.remove(interaction.values
    .map(id => interaction.guild.roles.resolve(id)));

  await interaction.update({
    content: `:white_check_mark: Role${fmt_plural(interaction.values)} removed!`,
    components: []
  });
};
