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
        .setRequired(true))))
  .addSubcommandGroup(group => group
    .setName("color")
    .setDescription("Color command-related options.")
    .addSubcommand(sub => sub
      .setName("register")
      .setDescription("Register a color.")
      .addRoleOption(o => o
        .setName("color")
        .setDescription("The color to register.")
        .setRequired(true)))
    .addSubcommand(sub => sub
      .setName("deregister")
      .setDescription("De-register a color.")
      .addRoleOption(o => o
        .setName("color")
        .setDescription("The color to de-register.")
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

  // manage color
  if (subgroup === "color") {
    const subcommand = interaction.options.getSubcommand(true);
    const color = interaction.options.getRole("color");

    const colors_db = interaction.client.db.get("colors");
    await colors_db.read();

    // manage color register
    if (subcommand === "register") {
      if (colors_db.data.indexOf(color.id) !== -1) return interaction.reply({
        ephemeral: true,
        content: `${color} is already a registered color.`
      });

      colors_db.data.push(color.id);
      await colors_db.write();

      return interaction.reply({
        ephemeral: true,
        content: `${color} has been registered.`
      });
    }

    // manage color deregister
    if (subcommand === "deregister") {
      if (colors_db.data.indexOf(color.id) === -1) return interaction.reply({
        ephemeral: true,
        content: `${color} is not a registered color.`
      });

      colors_db.data.splice(colors_db.data.indexOf(color.id), 1);
      await colors_db.write();

      return interaction.reply({
        ephemeral: true,
        content: `${color} has been de-registered.`
      });
    }
  }
};
