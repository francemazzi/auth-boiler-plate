import request from 'supertest';
import { AppFactory } from '../src/infrastructure/http/appFactory';
import { integrationCleanup } from './cleanup';

describe('Auth routes (integration)', () => {
  const app = AppFactory.create();

  const testUser = {
    email: `john.doe+${Date.now()}@example.com`,
    password: 'SuperSecret123!',
    name: 'John Doe',
  };

  it('POST /auth/register -> 201 creates user', async () => {
    const res = await request(app).post('/auth/register').send(testUser);
    expect(res.status).toBe(201);
    expect(res.body?.status).toBe('success');
    expect(res.body?.data?.user?.email).toBe(testUser.email);
    const createdUserId = res.body?.data?.user?.id as string | undefined;
    if (createdUserId) integrationCleanup.track('user', createdUserId);
  });

  it('POST /auth/login -> 200 returns token and user', async () => {
    const reg = await request(app).post('/auth/register').send(testUser);
    expect(reg.status).toBe(201);
    const createdUserId = reg.body?.data?.user?.id as string | undefined;
    if (createdUserId) integrationCleanup.track('user', createdUserId);
    const res = await request(app).post('/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });
    expect(res.status).toBe(200);
    expect(res.body?.data?.token).toBeDefined();
    const cookiesHeader = res.headers['set-cookie'];
    const cookies = Array.isArray(cookiesHeader)
      ? cookiesHeader
      : cookiesHeader
        ? [cookiesHeader]
        : [];
    expect(cookies.some((c) => typeof c === 'string' && c.startsWith('auth_token='))).toBe(true);
  });

  it('GET /auth/me -> 401 without token', async () => {
    const res = await request(app).get('/auth/me');
    expect(res.status).toBe(401);
  });

  it('GET /auth/me -> 200 with token', async () => {
    const reg = await request(app).post('/auth/register').send(testUser);
    expect(reg.status).toBe(201);
    const createdUserId = reg.body?.data?.user?.id as string | undefined;
    if (createdUserId) integrationCleanup.track('user', createdUserId);
    const login = await request(app).post('/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });

    const token = login.body?.data?.token as string;

    const res = await request(app).get('/auth/me').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body?.email).toBe(testUser.email);
  });
});
