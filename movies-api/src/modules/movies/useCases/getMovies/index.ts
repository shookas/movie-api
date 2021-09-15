import { GetMoviesService } from './GetMoviesService';
import { GetMoviesController } from './GetMoviesController';
import { MoviesRepository } from '../../infrastructure/repository/MoviesRepository';
import { Db } from 'mongodb';

export default class GetMovies {
  private readonly db: Db;
  private getMoviesController: GetMoviesController;

  constructor(db: Db) {
    this.db = db;
    this.initUseCase();
  }

  initUseCase(): void {
    const moviesRepository = new MoviesRepository(this.db);
    const getMoviesService = new GetMoviesService(moviesRepository);
    this.getMoviesController = new GetMoviesController(getMoviesService);
  }

  getController(): GetMoviesController {
    return this.getMoviesController;
  }
}
