import { Filter, InsertOneResult } from 'mongodb';
import { IMovieDto } from './IMovieDto';

export default interface IMoviesRepository {
  getMovies(filter?: Filter<IMovieDto>): Promise<IMovieDto[]>;
  saveMovie(movie: IMovieDto): Promise<InsertOneResult<IMovieDto>>;
}
