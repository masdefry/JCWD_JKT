import { findProducts } from '../controller/products.controller';
import { Router } from 'express';
const productsRouter = Router();

productsRouter.get('/:id', findProducts);

export default productsRouter;
