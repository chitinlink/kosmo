import logger from "../logging.js";

export const name = "error";
export const execute = async error => logger.error(error.stack);
