import express, { NextFunction, Request, Response, Express } from 'express';
import productsRouter from './routers/products.router';
import logger from './utils/logger';

const app: Express = express();
console.log('>');
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello World');
});

app.use('/api/products', productsRouter);

// Centralized Error
interface IError extends Error {
  status?: number;
  isOperational?: boolean;
}

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  const errorStatus: number = err.isOperational ? err.status! : 500;

  logger.error(`${req.method} - ${req.url}, ${err.message}`);

  res.status(errorStatus).json({
    success: false,
    message: err.isOperational ? err.message : 'Interval Server Error',
    data: null,
  });
});

export default app;
