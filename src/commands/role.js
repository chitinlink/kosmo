import { SlashCommandBuilder } from "@discordjs/builders";
import logger from "../logging.js";

export const data = new SlashCommandBuilder()
  .setName("role")
  .setDescription("Role-related tools.")
  .addSubcommand(sub => sub
    .setName("list")
    .setDescription("List all self-assignable roles."))
  // .addSubcommand(sub => sub
  //   .setName("register")
  //   .setDescription("Register a role as self-assignable.")
  //   .addRoleOption(o => o.setRequired(true).setName("role")
  //     .setDescription("The role that will become available")))
  // .addSubcommand(sub => sub
  //   .setName("deregister")
  //   .setDescription("Deregister a role as self-assignable.")
  //   .addRoleOption(o => o.setRequired(true).setName("role")
  //     .setDescription("The role that will no longer be available")))
  .addSubcommand(sub => sub
    .setName("add")
    .setDescription("Assign yourself a role."))
  .addSubcommand(sub => sub
    .setName("remove")
    .setDescription("Remove a role you have."));

export const execute = async interaction => {
  const subcommand = interaction.options.getSubcommand(true);

  if (subcommand === "list") {
    return interaction.reply({
      ephemeral: true,
      content: ""
    });
  }

  logger.warn("Unimplemented");
  return interaction.reply(":warning: Unimplemented");
};
