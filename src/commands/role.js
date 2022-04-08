import { SlashCommandBuilder } from "@discordjs/builders";
import { fmt_list } from "../utils/text.js";

export const data = new SlashCommandBuilder()
  .setName("role")
  .setDescription("Role-related tools.")
  .setDefaultPermission(true)
  .addSubcommand(sub => sub
    .setName("list")
    .setDescription("List all self-assignable roles."))
  .addSubcommand(sub => sub
    .setName("add")
    .setDescription("Assign yourself a role.")
    .addRoleOption(o => o
      .setName("role")
      .setDescription("The role you want.")
      .setRequired(true)))
  .addSubcommand(sub => sub
    .setName("remove")
    .setDescription("Remove a role you have.")
    .addRoleOption(o => o
      .setName("role")
      .setDescription("The role you want to remove.")
      .setRequired(true)));

export const execute = async interaction => {
  const roles_db = interaction.client.db.get("roles");
  await roles_db.read();

  if (roles_db.data.length === 0) return interaction.reply({
    ephemeral: true,
    content: "There are no self-assignable roles at this time."
  });

  const available_roles = await interaction.guild.roles.fetch()
    .then(roles => Array.from(roles.values())
      .filter(r => roles_db.data.indexOf(r.id) !== -1));

  const member_roles = available_roles
    .filter(role => interaction.member.roles.cache.has(role.id));

  const subcommand = interaction.options.getSubcommand(true);

  // role list
  if (subcommand === "list") {
    return interaction.reply({
      ephemeral: true,
      content: fmt_list(available_roles)
    });
  }

  let role;
  if (subcommand === "add" || subcommand === "remove") {
    role = interaction.options.getRole("role");

    if (!available_roles.includes(role)) {
      return interaction.reply({
        ephemeral: true,
        content: "You can't self-assign that role."
      });
    }
  }

  // role add
  if (subcommand === "add") {
    if (member_roles.includes(role)) {
      return interaction.reply({
        ephemeral: true,
        content: "You already have that role."
      });
    }

    await interaction.member.roles.add(role);

    return interaction.reply({
      ephemeral: true,
      content: ":white_check_mark: Role added!"
    });
  }

  // role remove
  if (subcommand === "remove") {
    if (!member_roles.includes(role)) {
      return interaction.reply({
        ephemeral: true,
        content: "You already don't have that role."
      });
    }

    await interaction.member.roles.remove(role);

    return interaction.reply({
      ephemeral: true,
      content: ":white_check_mark: Role removed!"
    });
  }
};
