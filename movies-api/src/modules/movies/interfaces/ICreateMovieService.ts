import { IUserData } from '../../../shared/interfaces/IUserData';

export default interface ICreateMovieService {
  execute(title: string, user: IUserData): Promise<void>;
}
