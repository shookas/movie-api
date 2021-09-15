import { createLogger, transports, Logger, format } from 'winston';
import IWinstonLogger from '../../interfaces/IWinstonLogger';

export class WinstonLogger implements IWinstonLogger {
  private readonly logFile: string = 'all.log';
  private readonly errorLog: string = 'error.log';

  public getLogger(): Logger {
    const logger = createLogger({
      level: 'info',
      format: format.json(),
      transports: [
        new transports.File({ filename: this.errorLog, level: 'error' }),
        new transports.File({ filename: this.logFile }),
      ],
    });

    if (process.env.NODE_ENV !== 'production') {
      logger.add(
        new transports.Console({
          format: format.simple(),
        }),
      );
    }

    return logger;
  }
}
