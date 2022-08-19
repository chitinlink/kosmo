// eslint-disable-next-line no-unused-vars
import { Guild, Message, CommandInteraction } from "discord.js";

/**
 * Get an "s" or "" to pluralize based on quantity
 * @param {number|bigint|Array|Iterator} t
 */
export const fmt_plural = t => {
  if ((typeof t === "number") && t > 1) return "s";
  if ((typeof t === "bigint") && t > 1n) return "s";
  if (Array.isArray(t) && t.length !== 1) return "s";
  return "";
};

/**
 * Formats a Guild into a consistent style.
 * @param {Guild} guild
 */
export const fmt_guild = guild =>
  `${guild.name} (${guild.id})`;

/**
 * Formats a User into a consistent style.
 * @param {User} user
 */
export const fmt_user = user =>
  `${user.system ? "(SYSTEM)" : ""}${user.bot ? "(BOT)" : ""}${user.tag}`;

/**
 * Formats the origin of a message or interaction into a consistent style.
 * @param {Message|CommandInteraction} message
 */
export const fmt_origin = message => {
  let out = `${message.guild.name}/`;

  let
    c_channel = message.channel,
    channel_path = message.channel.name;

  while (c_channel.parent) {
    c_channel = c_channel.parent;
    channel_path = `${c_channel.name}/${channel_path}`;
  }

  out += `${channel_path}@${fmt_user(message.author || message.user)}`;

  return out;
};

/**
 * Formats an array of strings into a list.
 * @param {string[]} list
 */
export const fmt_list = list => [""].concat(list).join("\n• ").trim();

/**
 * Formats a message or interaction into a consistent style.
 * @param {Message|CommandInteraction} message
 */
export const fmt_message = message => {
  let msg = `${fmt_origin(message)}: `;

  let extras = [];
  if (message.attachments.size > 0)
    extras.push(`${message.attachments.size} attachment${fmt_plural(message.attachments.size)}`);
  if (message.stickers.length > 0)
    extras.push(`${message.stickers.size} sticker${fmt_plural(message.stickers.length)}`);
  if (message.embeds.length > 0)
    extras.push(`${message.embeds.length} embed${fmt_plural(message.embeds.length)}`);
  if (message.components.length > 0)
    extras.push(`${message.components.length} component${fmt_plural(message.components.length)}`);
  if (extras.length > 0) msg += `(${extras.join(", ")}) `;

  msg += message.content;

  msg += ` (${message.url})`;

  return msg;
};
