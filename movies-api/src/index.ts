import 'dotenv/config';
import App from './shared/infrastructure/http/app';
import ApiV1 from './shared/infrastructure/http/api/v1';
import { MongoConnector } from './shared/infrastructure/database/MongoConnector';
import { WinstonLogger } from './shared/infrastructure/logger/WinstonLogger';

const { MONGO_IP, MONGO_PORT, MONGO_DB_NAME } = process.env;

const logger = new WinstonLogger().getLogger();

const mongoConnector = new MongoConnector(
  MONGO_IP as string,
  (MONGO_PORT as unknown) as number,
  MONGO_DB_NAME as string,
  logger,
);
mongoConnector.initializeDatabase().then(() => {
  const db = mongoConnector.getDatabaseConnection();
  const app = new App([new ApiV1(db)]);
  app.listen();
});
