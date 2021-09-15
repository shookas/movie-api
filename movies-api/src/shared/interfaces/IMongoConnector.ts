import { Db } from 'mongodb';

export default interface IMongoConnector {
  initializeDatabase(): Promise<void>;
  getDatabaseConnection(): Db;
}
