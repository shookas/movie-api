import * as express from 'express';
import { Db } from 'mongodb';

import CreateMovie from '../../../useCases/createMovie';
import GetMovies from '../../../useCases/getMovies';
import { VerifyAuth as authenticate } from '../../../../../shared/infrastructure/http/middlewares/VerifyAuth';
import { IRequestWithUser } from '../../../../../shared/interfaces/IRequestWithUser';

export default class Router {
  private readonly router: express.Router;
  private readonly db: Db;

  constructor(db: Db) {
    this.db = db;
    this.router = express.Router();
    this.initRoutes();
  }

  private initRoutes(): void {
    const createMovieController = new CreateMovie(this.db).getController();
    const getMoviesController = new GetMovies(this.db).getController();
    this.router.post('/', authenticate(), (req: IRequestWithUser, res, next) =>
      createMovieController.execute(req, res, next),
    );
    this.router.get('/', (req, res, next) =>
      getMoviesController.execute(req, res, next),
    );
  }

  getRouter(): express.Router {
    return this.router;
  }
}
