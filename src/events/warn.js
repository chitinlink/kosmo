import logger from "../logging.js";

export const name = "warn";
export const execute = async (client, info) => logger.warn(info);
