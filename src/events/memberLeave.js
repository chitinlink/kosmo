import { userMention } from "discord.js";

export const name = "guildMemberRemove";

export const execute = async (client, member) => {
  await client.notice_channel.send({
    content: `${userMention(member.user.id)} has left the server.`
  });
};
