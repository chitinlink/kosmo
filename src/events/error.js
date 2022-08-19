import logger from "../logging.js";
import { writeFileSync } from "fs";

export const name = "error";
export const execute = async (client, error) => {
  logger.error(error.stack);
  writeFileSync("./.crashed", "");
  process.exit(1);
};
