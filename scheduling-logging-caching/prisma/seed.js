const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { addMinutes } = require('date-fns');

const products = [
  {
    name: 'Apel Malang',
    price: '25000',
    stock: 1000,
    description: 'Apel Malang',
    category: 'FOOD_AND_BEVERAGE',
    imageUrl: 'apelmalang.jpg',
  },
];

const transactions = [
  {
    status: 'WAITING_FOR_PAYMENT',
    totalPrice: 75000,
    expiredAt: addMinutes(new Date(), 2),
  },
];

const transactionItems = [
  {
    productId: 1,
    qty: 3,
    price: 75000,
  },
];

async function main() {
  // for (const product of products) {
  //   await prisma.product.create({
  //     data: product,
  //   });
  // }

  const createdTransaction = await prisma.transaction.create({
    data: transactions[0],
  });

  console.log(createdTransaction);

  for (const transactionItem of transactionItems) {
    await prisma.transactionItem.create({
      data: {
        ...transactionItem,
        transactionId: createdTransaction.id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
