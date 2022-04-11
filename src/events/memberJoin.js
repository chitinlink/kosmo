import sample from "lodash/sample.js";

export const name = "guildMemberAdd";

export const execute = async (client, member) => {
  // Assign a random color to joiners
  const colors_db = client.db.get("colors");
  await colors_db.read();

  if (colors_db.data.length === 0) return;

  const available_colors = await member.guild.roles.fetch()
    .then(colors => Array.from(colors.values())
      .filter(r => colors_db.data.indexOf(r.id) !== -1));

  const color = sample(available_colors);

  await member.roles.add(color);
};
