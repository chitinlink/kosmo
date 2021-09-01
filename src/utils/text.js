// eslint-disable-next-line no-unused-vars
const { Guild, Message, Interaction } = require("discord.js");

/**
 * Get an "s" or "" to pluralize based on quantity
 * @param {number|bigint|Array|Iterator} t
 */
const fmt_plural = t => {
  if ((typeof t === "number") && t > 1) return "s";
  if ((typeof t === "bigint") && t > 1n) return "s";
  if (Array.isArray(t) && t.length !== 1) return "s";
  return "";
};

/**
 * Formats a Guild into a consistent style.
 * @param {Guild} guild
 */
const fmt_guild = guild =>
  `<${guild.id}> ${guild.name}`; //+
  //`(${guild.memberCount} member${fmt_plural(guild.memberCount)})`;

/**
 * Formats a User into a consistent style.
 * @param {User} user
 */
const fmt_user = user =>
  `${user.system ? "(SYSTEM) " : ""}${user.bot ? "(BOT) " : ""}${user.tag}`;

/**
 * Formats the origin of a message or interaction into a consistent style.
 * @param {Message|Interaction} message
 */
const fmt_origin = message =>
  `${fmt_guild(message.guild)} #${message.channel.name} @${fmt_user(message.author || message.user)}`;

module.exports = { fmt_plural, fmt_guild, fmt_user, fmt_origin };
