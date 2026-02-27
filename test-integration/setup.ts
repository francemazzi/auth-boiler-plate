import 'dotenv/config';
import { prisma } from './prisma.js';
import { integrationCleanup } from './cleanup.js';

beforeAll(async () => {
  await prisma.$connect();
});

afterEach(async () => {
  await integrationCleanup.run();
});

afterAll(async () => {
  await prisma.$disconnect();
});
