import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export const findProducts = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('>>>')
    const { id } = req.params

    const findProductById = await prisma.product.findFirst({
      where: {
        id: parseInt(id)
      }
    })

    if(!findProductById) throw {isOperational: true, message: `Product with id ${id} not found`}

    res.status(200).json({
      success: true, 
      message: `Get product with id ${id} successful`,
      products: findProductById
    })
  } catch (error) {
    next(error)
  }
};
