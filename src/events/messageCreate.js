const logger = require("../logging.js");
const { fmt_origin, fmt_plural } = require("../utils/text.js");

module.exports = {
  name: "messageCreate",
  async execute(message) {

    let msg = `${fmt_origin(message)}: `;

    if (message.attachments.size > 0) msg +=
      `(${message.attachments.size} attachment${fmt_plural(message.attachments.size)}) `;

    msg += message.content;

    logger.message(msg);

    if (message.attachments.size > 0) {
      message.attachments.forEach(a => logger.message(`  ${a.url}`));
    }
  },
};
