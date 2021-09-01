const winston = require("winston");
require("winston-daily-rotate-file");

const TIMESTAMP_FORMAT = "YYYY/MM/DD-hh:mm:ss";

const format = winston.format.combine(
  winston.format.timestamp({ format: TIMESTAMP_FORMAT }),
  winston.format.printf(info =>
    `[${info.timestamp}] ${info.level.padStart(5)}: ${info.message}`)
);
const format_colorized = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: TIMESTAMP_FORMAT }),
  winston.format.printf(info =>
    `[${info.timestamp}] ${info.level.padStart(15)}: ${info.message}`)
);
// NOTE padStart(15) because I'm accounting for the color escape codes

const logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console({ format: format_colorized }),
    new winston.transports.DailyRotateFile({
      format,
      filename: "./logs/%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d"
    }),
  ],
});

module.exports = logger;
