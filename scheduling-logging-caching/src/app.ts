import express, { NextFunction, Request, Response, Express } from 'express';
import productsRouter from './routers/products.router';

const app: Express = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello World');
});

app.use('/api/products', productsRouter);

// Centralized Error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: err.message,
    data: null,
  });
});

export default app;
