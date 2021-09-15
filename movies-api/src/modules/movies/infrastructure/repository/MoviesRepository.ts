import { Db, Filter, InsertOneResult } from 'mongodb';
import { IMovieDto } from '../../interfaces/IMovieDto';

export class MoviesRepository {
  private db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async getMovies(filter: Filter<IMovieDto> = {}): Promise<IMovieDto[]> {
    const results = await this.db
      .collection<IMovieDto>('movies')
      .find(filter)
      .toArray();
    return results;
  }
  async saveMovie(movie: IMovieDto): Promise<InsertOneResult<IMovieDto>> {
    const results = await this.db.collection('movies').insertOne(movie);
    return results;
  }
}
