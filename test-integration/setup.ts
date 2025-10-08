import 'dotenv/config';
import { prisma } from './prisma';
import { integrationCleanup } from './cleanup';

beforeAll(async () => {
  await prisma.$connect();
});

afterEach(async () => {
  await integrationCleanup.run();
});

afterAll(async () => {
  await prisma.$disconnect();
});
