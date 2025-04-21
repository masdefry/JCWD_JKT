import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { subMinutes } from 'date-fns';

export const expiryTransactionJob = async() => {
    // const oneMinuteAgo = subMinutes(new Date(), 1)

    const expiredTransaction = await prisma.transaction.updateMany({
        where: {
            status: 'WAITING_FOR_PAYMENT', 
            expiredAt: {
                lte: new Date()
            }
        }, 
        data: {
            status: 'CANCELLED'
        }
    })

    console.log(`${expiredTransaction.count} transaction is expiry`)
};
