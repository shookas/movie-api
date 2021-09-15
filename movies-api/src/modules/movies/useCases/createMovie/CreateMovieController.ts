import ICreateMovieService from '../../interfaces/ICreateMovieService';

import * as express from 'express';
import { IRequestWithUser } from '../../../../shared/interfaces/IRequestWithUser';
import HttpException from '../../../../shared/infrastructure/http/exceptions/http';
import FreeTireLimitException from '../../infrastructure/http/routes/exceptions/FreeTIreLimit';

export class CreateMovieController {
  private readonly service: ICreateMovieService;

  constructor(service: ICreateMovieService) {
    this.service = service;
  }

  async execute(
    req: IRequestWithUser,
    res: express.Response,
    next: express.NextFunction,
  ): Promise<express.Response | undefined> {
    const { title } = req.body;
    if (!title) {
      next(new HttpException(422, 'title is missing in the request body'));
    }

    try {
      await this.service.execute(title, req.user!);
      return res.json({ result: 'success' });
    } catch (e) {
      if (e instanceof FreeTireLimitException) {
        next(new FreeTireLimitException());
      }
      next(new HttpException(422, 'Cannot save movie'));
    }
  }
}
