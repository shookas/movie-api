import { Router } from 'express';

interface Route {
  path?: string;
  getRouter: () => Router;
}

export default Route;
