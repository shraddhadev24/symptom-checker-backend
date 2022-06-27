import winston, { format } from "winston";
import fs from "fs";
import { LOG_DIR, ALLOWED_ENV } from "../constants/app";
import { LOG_TYPE, LOGGER_FILE_EXTENSION } from "../constants/logger";

const { combine, timestamp, printf } = format;
const logDir = LOG_DIR;
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logFilename = `${logDir}/${new Date()
  .toLocaleDateString()
  .replace(/\D/g, "-")}-${LOGGER_FILE_EXTENSION}`;

const logger = winston.createLogger({
  level: LOG_TYPE.info,
  format: combine(timestamp(), myFormat),
  transports: [new winston.transports.File({ filename: logFilename })],
});

if (process.env.NODE_ENV !== ALLOWED_ENV.production) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logger;
