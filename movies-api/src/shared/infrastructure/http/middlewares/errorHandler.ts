import { Request, Response } from 'express';
import HttpException from '../exceptions/http';

function errorMiddleware(error: HttpException, _req: Request, res: Response) {
  const status: number = error.status || 500;
  const message: string = error.message || 'Something went wrong';

  res.status(status).json({ message });
}

export default errorMiddleware;
