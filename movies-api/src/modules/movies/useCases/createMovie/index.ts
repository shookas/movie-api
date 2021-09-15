import { CreateMovieService } from './CreateMovieService';
import { CreateMovieController } from './CreateMovieController';
import { MoviesRepository } from '../../infrastructure/repository/MoviesRepository';
import { Db } from 'mongodb';

export default class CreateMovie {
  private readonly db: Db;
  private createMovieController: CreateMovieController;

  constructor(db: Db) {
    this.db = db;
    this.initUseCase();
  }

  initUseCase(): void {
    const moviesRepository = new MoviesRepository(this.db);
    const createMovieService = new CreateMovieService(moviesRepository);
    this.createMovieController = new CreateMovieController(createMovieService);
  }

  getController(): CreateMovieController {
    return this.createMovieController;
  }
}
