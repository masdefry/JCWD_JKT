import { findProducts } from '../controller/products.controller';
import { Router } from 'express';
const productsRouter = Router();
// import { getProductsCache } from '../middlewares/cache/get.products.cache';

productsRouter.get('/:id', findProducts);

export default productsRouter;
