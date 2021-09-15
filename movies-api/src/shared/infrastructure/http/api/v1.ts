import * as express from 'express';
import { Db } from 'mongodb';
import Route from './../../../../shared/interfaces/Route';
import Router from '../../../../modules/movies/infrastructure/http/routes/index';

export default class ApiV1 implements Route {
  private readonly router: express.Router;
  private readonly db: Db;

  constructor(db: Db) {
    this.db = db;
    this.router = express.Router();
    this.setRoutes();
  }

  private setRoutes(): void {
    const useCaseRouter = new Router(this.db).getRouter();
    this.router.use('/v1/movies', useCaseRouter);
  }

  getRouter(): express.Router {
    return this.router;
  }
}
