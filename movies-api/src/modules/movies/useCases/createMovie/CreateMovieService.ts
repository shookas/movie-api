import IMovieRepository from '../../interfaces/IMoviesRepository';
import ICreateMovieService from '../../interfaces/ICreateMovieService';
import { IMovieOmd } from '../../interfaces/IMovieOmd';
import axios from 'axios';
import { IUserData } from '../../../../shared/interfaces/IUserData';
import { Movie } from '../../domains/Movie';
import FreeTireLimitException from '../../infrastructure/http/routes/exceptions/FreeTIreLimit';

export class CreateMovieService implements ICreateMovieService {
  private movieRepository: IMovieRepository;
  private readonly MAX_LIMIT_FOR_FREE_TIER = 5;

  constructor(movieRepository: IMovieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(title: string, user: IUserData): Promise<void> {
    const { data: movieOmd } = await this.fetchMovieByTitle(title);
    const { Title, Released, Genre, Director } = movieOmd;
    if (user.role === 'basic') {
      const canUse = await this.checkUserFreeTier(user);
      if (!canUse) {
        throw new FreeTireLimitException();
      }
    }
    const movie = Movie.createMovie({
      Title,
      Released,
      Genre,
      Director,
      meta: {
        createdBy: user.userId,
        createdAt: new Date(Date.now()).toISOString(),
      },
    });
    await this.movieRepository.saveMovie(movie.getProps());
    return;
  }

  private async fetchMovieByTitle(title: string): Promise<{ data: IMovieOmd }> {
    return axios.get(
      `http://www.omdbapi.com/?i=${process.env.OMD_API_I}&apikey=${process.env.OMD_API_KEY}&t=${title}`,
    );
  }

  private async checkUserFreeTier(user: IUserData): Promise<boolean> {
    const myMovies = await this.movieRepository.getMovies({
      'meta.createdBy': user.userId,
    });
    const currentMonth = new Date(Date.now()).getMonth();
    const moviesInThisMonth = myMovies?.filter((movie) => {
      const createdMonth = new Date(movie.meta.createdAt).getMonth();
      return createdMonth === currentMonth;
    });
    return moviesInThisMonth.length <= this.MAX_LIMIT_FOR_FREE_TIER;
  }
}
