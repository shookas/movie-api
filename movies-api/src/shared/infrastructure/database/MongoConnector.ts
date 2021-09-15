import { MongoClient, MongoClientOptions, Db } from 'mongodb';
import { Logger } from 'winston';

import IMongoConnector from '../../interfaces/IMongoConnector';

export class MongoConnector implements IMongoConnector {
  private readonly mongoIp: number | string;
  private readonly port: number;
  private readonly databaseName: string;
  private readonly mongoUrl: string;
  private readonly logger: Logger;
  private dbClient: MongoClient;
  private dbConnection: Db;

  constructor(
    mongoIp: string | number,
    mongoPort: number,
    databaseName: string,
    logger: Logger,
  ) {
    this.mongoIp = mongoIp;
    this.port = mongoPort;
    this.databaseName = databaseName;
    this.logger = logger;
    this.mongoUrl = `mongodb://${this.mongoIp}:${this.port}/${this.databaseName}`;
  }

  async initializeDatabase(): Promise<void> {
    this.logger.info('Initializing the MongoDb Connection');
    try {
      if (!this.dbClient) {
        this.dbClient = await MongoClient.connect(
          this.mongoUrl,
          this.getMongoClientOptions(),
        );
        this.setDatabaseConnection();
      }
    } catch (e) {
      this.logger.error(`Error on connecting to MongoDb Error:  ${e}`);
    }
  }

  public getDatabaseConnection(): Db {
    return this.dbConnection;
  }

  private setDatabaseConnection(): void {
    if (!this.dbClient) {
      this.logger.error('Db connection is not yet established');
      return;
    }

    if (this.dbConnection) {
      this.logger.error('Db has been already set');
      return;
    }

    try {
      this.dbConnection = this.dbClient.db(this.databaseName);
      this.logger.info('Successfully connected to the MongoDb');
    } catch (e) {
      this.logger.error(`error on setting db error: ${e}`);
    }
  }

  private getMongoClientOptions(): MongoClientOptions {
    return {};
  }
}
