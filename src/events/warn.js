import logger from "../logging.js";

export const name = "warn";
export const execute = async info => logger.warn(info);
