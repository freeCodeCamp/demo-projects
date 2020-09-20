const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const { printf, timestamp, combine } = format;

const _format = printf(info => {
  return `${info.timestamp} [${info.level.toUpperCase()}] ${info.message}`;
});

const {
  logLevels: { _default, file, filePath },
} = require('../config');

const logger = createLogger({
  format: combine(timestamp(), _format),
  transports: [new transports.Console({ level: _default })],
});

if (file) {
  logger.add(
    new transports.DailyRotateFile({
      filename: `${filePath}/tw-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      maxSize: '10m',
      maxFiles: '2d',
      level: file,
    })
  );
}

logger.info(
  `logger initialized with console level: ${_default}, file level: ${file ||
    'none'}`
);

module.exports = logger;
