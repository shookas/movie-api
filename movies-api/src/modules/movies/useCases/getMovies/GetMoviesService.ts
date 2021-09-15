import IMoviesRepository from '../../interfaces/IMoviesRepository';
import IGetMoviesService from '../../interfaces/IGetMoviesService';
import { IMovie } from '../../interfaces/IMovie';
import { Movie } from '../../domains/Movie';

export class GetMoviesService implements IGetMoviesService {
  private moviesRepository: IMoviesRepository;

  constructor(moviesRepository: IMoviesRepository) {
    this.moviesRepository = moviesRepository;
  }

  async execute(): Promise<IMovie[]> {
    const movies = await this.moviesRepository.getMovies();
    return movies.map((movie) => {
      const movieEl = Movie.createMovie(movie);
      return movieEl.withoutMeta();
    });
  }
}
