import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import { IRequestWithUser } from '../../../../shared/interfaces/IRequestWithUser';
import { IUserData } from '../../../../shared/interfaces/IUserData';
import HttpException from '../exceptions/http';

export function VerifyAuth() {
  return async (
    req: IRequestWithUser,
    _res: express.Response,
    next: express.NextFunction,
  ) => {
    const tokenWithScheme: string = req.headers['authorization'] as string;
    const bearerScheme = new RegExp(/^Bearer\s+/);
    const isBearerScheme = bearerScheme.test(tokenWithScheme);

    if (!tokenWithScheme || !isBearerScheme) {
      next(new HttpException(401, 'Wrong authentication token'));
    }

    const token = tokenWithScheme?.replace(bearerScheme, '');

    jwt.verify(token, process.env.APP_SECRET as jwt.Secret, (err, decoded) => {
      if (err) {
        next(new HttpException(401, 'Wrong authentication token'));
      }
      req.user = decoded as IUserData;
      next();
    });
  };
}
