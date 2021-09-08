import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageActionRow, MessageSelectMenu } from "discord.js";
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
    .setDescription("Assign yourself a role."))
  .addSubcommand(sub => sub
    .setName("remove")
    .setDescription("Remove a role you have."));

export const execute = async interaction => {
  const roles_db = interaction.client.db.get("roles");
  await roles_db.read();

  if (roles_db.data.length === 0) return interaction.reply({
    ephemeral: true,
    content: "There are no self-assignable roles at this time."
  });

  const subcommand = interaction.options.getSubcommand(true);

  const available_roles = await interaction.guild.roles.fetch()
    .then(roles => Array.from(roles.values())
      .filter(r => roles_db.data.indexOf(r.id) !== -1));

  // role list
  if (subcommand === "list") {
    return interaction.reply({
      ephemeral: true,
      content: fmt_list(available_roles)
    });
  }

  const member_roles = available_roles
    .filter(role => interaction.member.roles.cache.has(role.id));

  const possible_roles = available_roles
    .filter(role => !interaction.member.roles.cache.has(role.id));

  // role add
  // Interaction handled in events/roleAdd.js
  if (subcommand === "add") {
    if (possible_roles.length === 0) return interaction.reply({
      ephemeral: true,
      content: "You already have all the roles you can add!"
    });

    const row = new MessageActionRow()
      .addComponents(new MessageSelectMenu()
        .setCustomId("roleAdd")
        .setPlaceholder("Select roles")
        .setMinValues(1)
        .addOptions(possible_roles.map(r => ({
          label: r.name,
          value: r.id
        }))));

    return interaction.reply({
      ephemeral: true,
      content: "Please choose the roles you want:",
      components: [row]
    });
  }

  // role remove
  // Interaction handled in events/roleRemove.js
  if (subcommand === "remove") {
    if (member_roles.length === 0) return interaction.reply({
      ephemeral: true,
      content: "You don't have any roles you can remove!"
    });

    const row = new MessageActionRow()
      .addComponents(new MessageSelectMenu()
        .setCustomId("roleRemove")
        .setPlaceholder("Select roles")
        .setMinValues(1)
        .addOptions(member_roles.map(r => ({
          label: r.name,
          value: r.id
        }))));

    return interaction.reply({
      ephemeral: true,
      content: "Please choose the roles you don't want:",
      components: [row]
    });
  }
};
