import { IMetadata } from './IMetadata';
import { IMovie } from './IMovie';

export interface IMovieDto extends IMovie {
  meta: IMetadata;
}
