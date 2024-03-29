import winston from "winston";
import "winston-daily-rotate-file";

const TIMESTAMP_FORMAT = "YYYY/MM/DD hh:mm:ss";

const format = winston.format.combine(
  winston.format.timestamp({ format: TIMESTAMP_FORMAT }),
  winston.format.printf(info =>
    `[${info.timestamp}] ${info.level.padStart(7)}: ${info.message}`)
);
const format_colorized = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: TIMESTAMP_FORMAT }),
  winston.format.printf(info =>
    `[${info.timestamp}] ${info.level.padStart(17)}: ${info.message}`)
);
// NOTE padStart(17) because I'm accounting for the color escape codes

const customLevels = {
  levels: { error: 0, warn: 1, info: 2, command: 3, message: 4, deleted: 5, edited: 6, debug: 7 },
  colors: {
    error: "red", //"bold white redBG",
    warn: "yellow",
    info: "green",
    message: "white",
    deleted: "white",
    edited: "white",
    command: "white",
    debug: "cyan"
  }
};

const logger = winston.createLogger({
  levels: customLevels.levels,
  level: "debug",
  transports: [
    new winston.transports.Console({ format: format_colorized }),
    new winston.transports.DailyRotateFile({
      format,
      filename: "./logs/%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "15d"
    }),
  ],
});

winston.addColors(customLevels.colors);

export default logger;
