const { Guild } = require("discord.js");

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
  `<${guild.id}> ${guild.name} `; //+
  //`(${guild.memberCount} member${fmt_plural(guild.memberCount)})`;

module.exports = { fmt_plural, fmt_guild };
