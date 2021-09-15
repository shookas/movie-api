import { IMovie } from './IMovie';

export default interface IGetMoviesService {
  execute(): Promise<IMovie[]>;
}
