import { jest, beforeAll, beforeEach } from '@jest/globals';
import { PrismaClient } from '../generated/prisma/client.js';
import { mockDeep, mockReset } from 'jest-mock-extended';

const prismaMock = mockDeep<PrismaClient>();

beforeAll(() => {
  jest.mock('../generated/prisma/client.js', () => ({
    PrismaClient: jest.fn(() => prismaMock),
  }));
});

beforeEach(() => {
  mockReset(prismaMock);
});

export { prismaMock };
