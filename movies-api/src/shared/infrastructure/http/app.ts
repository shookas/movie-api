import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import Route from '../../../shared/interfaces/Route';

import errorMiddleware from './middlewares/errorHandler';

class App {
  public app: express.Application;
  public port: string | number;
  public env: boolean;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 3100;
    this.env = process.env.NODE_ENV === 'production';

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      // eslint-disable-next-line
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    if (this.env) {
      this.app.use(logger('combined'));
    } else {
      this.app.use(logger('dev'));
    }

    this.app.use(
      cors({
        origin: '*',
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      }),
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use('/', route.getRouter());
    });
  }
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
