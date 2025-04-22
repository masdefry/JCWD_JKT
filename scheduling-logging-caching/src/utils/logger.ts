import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message, stack }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message} ${
        stack ? `\nStack: ${stack}` : ''
      }`;
    })
  ),
  transports: [
    // new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

export default logger;