import * as express from 'express';
import HttpException from '../../../../shared/infrastructure/http/exceptions/http';
import IGetMoviesService from '../../interfaces/IGetMoviesService';

export class GetMoviesController {
  private readonly service: IGetMoviesService;

  constructor(service: IGetMoviesService) {
    this.service = service;
  }

  async execute(
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): Promise<express.Response | undefined> {
    try {
      const movies = await this.service.execute();
      return res.json(movies);
    } catch (e) {
      next(new HttpException(422, 'Cannot get movies'));
    }
  }
}
