import { NextFunction, Request, Response } from 'express';
import redis from '../../config/redis.config';
const cacheKey = 'products:id'

export const getProductsCache = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const productCache = await redis.get(`${cacheKey}=${id}`)

        if(productCache){
            res.status(200).json({
                success: true, 
                message: `Get product with id ${id} from cache success`, 
                products: JSON.parse(productCache)
            })

            return
        }

        next()
    } catch (error) {
        next(error)
    }
}