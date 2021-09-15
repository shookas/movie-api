import { IUserData } from '../../../../shared/interfaces/IUserData';
import IMoviesRepository from '../../interfaces/IMoviesRepository';
import { CreateMovieService } from './CreateMovieService';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { IMovie } from '../../interfaces/IMovie';
import { IMovieOmd } from '../../interfaces/IMovieOmd';
import { IMovieDto } from '../../interfaces/IMovieDto';
import FreeTireLimitException from '../../infrastructure/http/routes/exceptions/FreeTIreLimit';

describe('Create Movie Service related tests', () => {
  let service: CreateMovieService;

  const saveMovieMock = jest.fn();
  const getMoviesMock = jest.fn<IMovieDto[], any>(() => []);
  const mockRepository = ({
    saveMovie: saveMovieMock,
    getMovies: getMoviesMock,
  } as unknown) as IMoviesRepository;

  const mockUser: IUserData = {
    userId: 123,
    name: 'John',
    role: 'basic',
    iat: 'string',
    exp: 'string',
    iss: 'string',
    sub: 'string',
  };

  const mockPremiumUser: IUserData = {
    userId: 123,
    name: 'John',
    role: 'premium',
    iat: 'string',
    exp: 'string',
    iss: 'string',
    sub: 'string',
  };

  const mockOmdResponse = {
    Title: 'Star Wars',
    Year: '1977',
    Rated: 'PG',
    Released: '25 May 1977',
    Runtime: '121 min',
    Genre: 'Action, Adventure, Fantasy',
    Director: 'George Lucas',
    Writer: 'George Lucas',
    Actors: 'Mark Hamill, Harrison Ford, Carrie Fisher',
    Plot:
      "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vad",
    Language: 'English',
    Country: 'United States, United Kingdom',
    Awards: 'Won 7 Oscars. 63 wins & 29 nominations total',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    Ratings: [
      {
        Source: 'Internet Movie Database',
        Value: '8.6/10',
      },
      {
        Source: 'Rotten Tomatoes',
        Value: '92%',
      },
      {
        Source: 'Metacritic',
        Value: '90/100',
      },
    ],
    Metascore: '90',
    imdbRating: '8.6',
    imdbVotes: '1,271,153',
    imdbID: 'tt0076759',
    Type: 'movie',
    DVD: '06 Dec 2005',
    BoxOffice: '$460,998,507',
    Production: 'Lucasfilm Ltd.',
    Website: 'N/A',
    Response: 'True',
  };

  const server = setupServer(
    rest.get('http://www.omdbapi.com/', (req, res, ctx) => {
      return res(ctx.json(mockOmdResponse));
    }),
  );

  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    Date.now = jest.fn(() => 1631705381415);
    service = new CreateMovieService(mockRepository);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('basic user', () => {
    test('should save movie if free tire allows', async () => {
      getMoviesMock.mockReturnValueOnce([
        {
          Title: 'Star Wars',
          Released: '25 May 1977',
          Genre: 'Action, Adventure, Fantasy',
          Director: 'George Lucas',
          meta: {
            createdAt: '2021-09-15T11:27:00.058Z',
            createdBy: 123,
          },
        },
        {
          Title: 'Star Wars',
          Released: '25 May 1977',
          Genre: 'Action, Adventure, Fantasy',
          Director: 'George Lucas',
          meta: {
            createdAt: '2021-09-15T11:27:00.058Z',
            createdBy: 123,
          },
        },
      ]);
      await service.execute('star wars', mockUser);
      expect(getMoviesMock).toHaveBeenCalledTimes(1);
      expect(getMoviesMock).toHaveBeenCalledWith({ 'meta.createdBy': 123 });
      expect(saveMovieMock).toHaveBeenCalledTimes(1);
      expect(saveMovieMock).toHaveBeenCalledWith({
        Director: 'George Lucas',
        Genre: 'Action, Adventure, Fantasy',
        Released: '25 May 1977',
        Title: 'Star Wars',
        meta: { createdAt: '2021-09-15T11:29:41.415Z', createdBy: 123 },
      });
    });
    test('should throw an error if free tire ends', async () => {
      getMoviesMock.mockReturnValueOnce([
        {
          Title: 'Star Wars',
          Released: '25 May 1977',
          Genre: 'Action, Adventure, Fantasy',
          Director: 'George Lucas',
          meta: {
            createdAt: '2021-09-15T11:27:00.058Z',
            createdBy: 123,
          },
        },
        {
          Title: 'Star Wars',
          Released: '25 May 1977',
          Genre: 'Action, Adventure, Fantasy',
          Director: 'George Lucas',
          meta: {
            createdAt: '2021-09-15T11:27:00.058Z',
            createdBy: 123,
          },
        },
        {
          Title: 'Star Wars',
          Released: '25 May 1977',
          Genre: 'Action, Adventure, Fantasy',
          Director: 'George Lucas',
          meta: {
            createdAt: '2021-09-15T11:27:00.058Z',
            createdBy: 123,
          },
        },
        {
          Title: 'Star Wars',
          Released: '25 May 1977',
          Genre: 'Action, Adventure, Fantasy',
          Director: 'George Lucas',
          meta: {
            createdAt: '2021-09-15T11:27:00.058Z',
            createdBy: 123,
          },
        },
        {
          Title: 'Star Wars',
          Released: '25 May 1977',
          Genre: 'Action, Adventure, Fantasy',
          Director: 'George Lucas',
          meta: {
            createdAt: '2021-09-15T11:27:00.058Z',
            createdBy: 123,
          },
        },
        {
          Title: 'Star Wars',
          Released: '25 May 1977',
          Genre: 'Action, Adventure, Fantasy',
          Director: 'George Lucas',
          meta: {
            createdAt: '2021-09-15T11:27:00.058Z',
            createdBy: 123,
          },
        },
      ]);
      try {
        await service.execute('star wars', mockUser);
      } catch (error) {
        expect(getMoviesMock).toHaveBeenCalledTimes(1);
        expect(getMoviesMock).toHaveBeenCalledWith({ 'meta.createdBy': 123 });
        expect(saveMovieMock).not.toHaveBeenCalled();
        expect(error).toStrictEqual(new FreeTireLimitException());
      }
    });
  });
  describe('premium user', () => {
    test('should allow to save movies for premium user without limits', async () => {
      getMoviesMock.mockReturnValueOnce([
        {
          Title: 'Star Wars',
          Released: '25 May 1977',
          Genre: 'Action, Adventure, Fantasy',
          Director: 'George Lucas',
          meta: {
            createdAt: '2021-09-15T11:27:00.058Z',
            createdBy: 123,
          },
        },
        {
          Title: 'Star Wars',
          Released: '25 May 1977',
          Genre: 'Action, Adventure, Fantasy',
          Director: 'George Lucas',
          meta: {
            createdAt: '2021-09-15T11:27:00.058Z',
            createdBy: 123,
          },
        },
        {
          Title: 'Star Wars',
          Released: '25 May 1977',
          Genre: 'Action, Adventure, Fantasy',
          Director: 'George Lucas',
          meta: {
            createdAt: '2021-09-15T11:27:00.058Z',
            createdBy: 123,
          },
        },
        {
          Title: 'Star Wars',
          Released: '25 May 1977',
          Genre: 'Action, Adventure, Fantasy',
          Director: 'George Lucas',
          meta: {
            createdAt: '2021-09-15T11:27:00.058Z',
            createdBy: 123,
          },
        },
        {
          Title: 'Star Wars',
          Released: '25 May 1977',
          Genre: 'Action, Adventure, Fantasy',
          Director: 'George Lucas',
          meta: {
            createdAt: '2021-09-15T11:27:00.058Z',
            createdBy: 123,
          },
        },
        {
          Title: 'Star Wars',
          Released: '25 May 1977',
          Genre: 'Action, Adventure, Fantasy',
          Director: 'George Lucas',
          meta: {
            createdAt: '2021-09-15T11:27:00.058Z',
            createdBy: 123,
          },
        },
      ]);
      await service.execute('star wars', mockPremiumUser);
      expect(saveMovieMock).toHaveBeenCalledTimes(1);
      expect(saveMovieMock).toHaveBeenCalledWith({
        Director: 'George Lucas',
        Genre: 'Action, Adventure, Fantasy',
        Released: '25 May 1977',
        Title: 'Star Wars',
        meta: { createdAt: '2021-09-15T11:29:41.415Z', createdBy: 123 },
      });
    });
  });
});
