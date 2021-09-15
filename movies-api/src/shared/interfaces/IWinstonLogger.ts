import { Logger } from 'winston';

export default interface IWinstonLogger {
  getLogger(): Logger;
}
