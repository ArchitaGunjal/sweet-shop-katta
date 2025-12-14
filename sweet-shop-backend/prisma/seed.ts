import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sweets = [
  { name: 'Rainbow Whirl', category: 'Lollipops', price: 2.50, quantity: 50, image: '🍭' },
  { name: 'Sour Crawlers', category: 'Gummies', price: 3.99, quantity: 100, image: '🐛' },
  { name: 'Dark Truffle', category: 'Chocolate', price: 1.50, quantity: 30, image: '🍫' },
  { name: 'Marshmallow Cloud', category: 'Soft', price: 4.50, quantity: 25, image: '☁️' },
  { name: 'Fizzy Cola Bottles', category: 'Gummies', price: 2.99, quantity: 75, image: '🥤' },
  { name: 'Berry Blast', category: 'Hard Candy', price: 1.20, quantity: 200, image: '🫐' },
  { name: 'Lemon Sherbet', category: 'Hard Candy', price: 1.20, quantity: 150, image: '🍋' },
  { name: 'Gummy Bears', category: 'Gummies', price: 3.50, quantity: 0, image: '🧸' }, // Out of stock example
  { name: 'Mint Choco Chip', category: 'Chocolate', price: 2.00, quantity: 45, image: '🍪' },
  { name: 'Strawberry Laces', category: 'Gummies', price: 1.80, quantity: 60, image: '🍓' },
  { name: 'Caramel Chew', category: 'Soft', price: 0.99, quantity: 10, image: '🍬' }, // Low stock example
  { name: 'Mega Jawbreaker', category: 'Hard Candy', price: 5.00, quantity: 15, image: '🔮' },
];

async function main() {
  console.log('🌱 Seeding database...');
  
  // Optional: Clear existing data
  // await prisma.sweet.deleteMany();

  for (const sweet of sweets) {
    const s = await prisma.sweet.create({
      data: sweet,
    });
    console.log(`Created sweet with id: ${s.id}`);
  }
  console.log('✅ Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });