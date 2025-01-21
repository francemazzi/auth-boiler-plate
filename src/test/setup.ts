import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset } from 'jest-mock-extended';
import '@jest/globals';

const prismaMock = mockDeep<PrismaClient>();

beforeAll(() => {
  jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn(() => prismaMock),
  }));
});

beforeEach(() => {
  mockReset(prismaMock);
});

export { prismaMock };
