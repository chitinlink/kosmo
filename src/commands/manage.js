import { SlashCommandBuilder, PermissionsBitField } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("manage")
  .setDescription("Mod commands.")
  .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
  .setDMPermission(false)
  .addSubcommandGroup(group => group
    .setName("membership")
    .setDescription("Grant or revoke a user's membership.")
    .addSubcommand(sub => sub
      .setName("grant")
      .setDescription("Grant the membership role to a new member so they can view channels.")
      .addUserOption(o => o
        .setName("member")
        .setDescription("Member who will get the membership role.")
        .setRequired(true)))
    .addSubcommand(sub => sub
      .setName("revoke")
      .setDescription("Revoke the membership role from a member to restrict their access.")
      .addUserOption(o => o
        .setName("member")
        .setDescription("Member who will lose the membership role.")
        .setRequired(true))))
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

  // manage membership
  if (subgroup === "membership") {
    const subcommand = interaction.options.getSubcommand(true);
    const member = interaction.options.getMember("member");

    // manage membership grant
    if (subcommand === "grant") {
      if (member.roles.cache.has(interaction.client.membership_role.id)) {
        return interaction.reply({
          ephemeral: true,
          content: `${member} already has ${interaction.client.membership_role}.`
        });
      }

      await member.roles.add(interaction.client.membership_role);

      await interaction.client.notice_channel.send({
        content: `:bellhop: ${member} has been granted ${interaction.client.membership_role} by ${interaction.member}.`
      });

      return interaction.reply({
        ephemeral: true,
        content: `${member} has been granted ${interaction.client.membership_role}.`
      });
    }

    // manage membership revoke
    if (subcommand === "revoke") {
      if (!member.roles.cache.has(interaction.client.membership_role.id)) {
        return interaction.reply({
          ephemeral: true,
          content: `${member} is already missing ${interaction.client.membership_role}.`
        });
      }

      await member.roles.remove(interaction.client.membership_role);

      await interaction.client.notice_channel.send({
        content: `:no_entry: ${member} has had ${interaction.client.membership_role} revoked by ${interaction.member}.`
      });

      return interaction.reply({
        ephemeral: true,
        content: `${member} has lost ${interaction.client.membership_role}.`
      });
    }
  }

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
