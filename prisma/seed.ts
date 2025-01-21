import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  console.log('Seeding database...');

  const adminPassword = await hash('admin123', 8);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: adminPassword,
      name: 'Admin User',
      emailVerified: true,
    },
  });
  console.log('Created admin user:', admin.email);

  const userPassword = await hash('user123', 8);
  const users = await Promise.all(
    Array.from({ length: 5 }).map(async (_, i) => {
      const user = await prisma.user.create({
        data: {
          email: `user${i + 1}@example.com`,
          password: userPassword,
          name: `Test User ${i + 1}`,
          emailVerified: true,
        },
      });
      console.log('Created user:', user.email);
      return user;
    }),
  );

  console.log(`Database has been seeded. 🌱`);
  console.log(`${users.length + 1} users created.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
