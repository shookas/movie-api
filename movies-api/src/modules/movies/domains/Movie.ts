import { IMetadata } from '../interfaces/IMetadata';
import { IMovieDto } from '../interfaces/IMovieDto';
import { Entity } from './Entity';

export class Movie extends Entity<IMovieDto> {
  get meta(): IMetadata {
    return this.props.meta;
  }

  private constructor(props: IMovieDto) {
    super(props);
  }

  public static createMovie(props: IMovieDto): Movie {
    const isValid = Object.values(props).every((value) => !!value);
    if (!isValid) {
      throw new Error('Movie is not valid');
    }
    return new Movie(props);
  }

  public withoutMeta() {
    const { meta, ...withoutMeta } = this.props;
    return withoutMeta;
  }
}
