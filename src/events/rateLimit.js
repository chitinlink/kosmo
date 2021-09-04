import logger from "../logging.js";

export const name = "rateLimit";
export const execute = async data => logger.error(
  `(Rate limit) TIMEOUT ${data.timeout}ms from ${data.route}`
);
