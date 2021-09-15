import * as express from 'express';
import { IUserData } from './IUserData';
export interface IRequestWithUser extends express.Request {
  user?: IUserData;
}
