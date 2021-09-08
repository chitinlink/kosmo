import { SlashCommandBuilder } from "@discordjs/builders";
import { mod_roles } from "../utils/permissions.js";

export const permissions = mod_roles;

export const data = new SlashCommandBuilder()
  .setName("manage")
  .setDescription("Mod commands.")
  .setDefaultPermission(false)
  .addSubcommandGroup(group => group
    .setName("role")
    .setDescription("Role command-related options.")
    .addSubcommand(sub => sub
      .setName("register")
      .setDescription("Register a role as self-assignable.")
      .addRoleOption(o => o
        .setName("role")
        .setDescription("The role to register.")
        .setRequired(true)))
    .addSubcommand(sub => sub
      .setName("deregister")
      .setDescription("De-register a role as self-assignable.")
      .addRoleOption(o => o
        .setName("role")
        .setDescription("The role to de-register.")
        .setRequired(true))));

export const execute = async interaction => {
  const subgroup = interaction.options.getSubcommandGroup(true);

  // manage role
  if (subgroup === "role") {
    const subcommand = interaction.options.getSubcommand(true);
    const role = interaction.options.getRole("role");

    const roles_db = interaction.client.db.get("roles");
    await roles_db.read();

    // manage role register
    if (subcommand === "register") {
      if (roles_db.data.indexOf(role.id) !== -1) return interaction.reply({
        ephemeral: true,
        content: `${role} is already a registered role.`
      });

      roles_db.data.push(role.id);
      await roles_db.write();

      return interaction.reply({
        ephemeral: true,
        content: `${role} has been registered.`
      });
    }

    // manage role deregister
    if (subcommand === "deregister") {
      if (roles_db.data.indexOf(role.id) === -1) return interaction.reply({
        ephemeral: true,
        content: `${role} is not a registered role.`
      });

      roles_db.data.splice(roles_db.data.indexOf(role.id), 1);
      await roles_db.write();

      return interaction.reply({
        ephemeral: true,
        content: `${role} has been de-registered.`
      });
    }
  }
};
