import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from '../auth.module';

describe('Auth (e2e)', () => {
  let app: INestApplication | undefined;

  beforeAll(async () => {
    process.env.JWT_SECRET = process.env.JWT_SECRET || 'e2e-test-access-secret';
    process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'e2e-test-refresh-secret';
    process.env.MONGODB_URI =
      process.env.MONGODB_URI || 'mongodb://localhost:27017/habitarena_test';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ThrottlerModule.forRoot([{ ttl: 60000, limit: 1000 }]),
        MongooseModule.forRoot(process.env.MONGODB_URI, {
          serverSelectionTimeoutMS: 5000,
        }),
        AuthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      })
    );
    await app.init();
  }, 15000);

  afterAll(async () => {
    if (app) await app.close();
  });

  describe('POST /api/v1/auth/register', () => {
    const validBody = {
      email: `e2e-${Date.now()}@example.com`,
      password: 'password123',
      displayName: 'E2E User',
    };

    it('should return 201 and tokens', () => {
      return request(app!.getHttpServer())
        .post('/api/v1/auth/register')
        .send(validBody)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
          expect(res.body).toHaveProperty('refresh_token');
          expect(typeof res.body.access_token).toBe('string');
          expect(typeof res.body.refresh_token).toBe('string');
        });
    });

    it('should return 400 when email already exists', () => {
      return request(app!.getHttpServer())
        .post('/api/v1/auth/register')
        .send(validBody)
        .expect(201)
        .then(() =>
          request(app!.getHttpServer())
            .post('/api/v1/auth/register')
            .send(validBody)
            .expect(400)
            .expect((res) => {
              expect(res.body.message).toContain('already exists');
            })
        );
    });

    it('should return 400 for invalid payload (missing fields)', () => {
      return request(app!.getHttpServer())
        .post('/api/v1/auth/register')
        .send({ email: 'a@b.com' })
        .expect(400);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    const email = `login-e2e-${Date.now()}@example.com`;
    const password = 'password123';
    const displayName = 'Login E2E';

    beforeAll(async () => {
      await request(app!.getHttpServer())
        .post('/api/v1/auth/register')
        .send({ email, password, displayName })
        .expect(201);
    });

    it('should return 200 and tokens', () => {
      return request(app!.getHttpServer())
        .post('/api/v1/auth/login')
        .send({ email, password })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
          expect(res.body).toHaveProperty('refresh_token');
        });
    });

    it('should return 400 for wrong password', () => {
      return request(app!.getHttpServer())
        .post('/api/v1/auth/login')
        .send({ email, password: 'wrongpassword' })
        .expect(400);
    });

    it('should return 400 for unknown email', () => {
      return request(app!.getHttpServer())
        .post('/api/v1/auth/login')
        .send({ email: 'nonexistent@example.com', password: 'any' })
        .expect(400);
    });
  });

  describe('POST /api/v1/auth/refresh', () => {
    let refreshToken: string;

    beforeAll(async () => {
      const email = `refresh-e2e-${Date.now()}@example.com`;
      const res = await request(app!.getHttpServer())
        .post('/api/v1/auth/register')
        .send({ email, password: 'password123', displayName: 'Refresh E2E' })
        .expect(201);
      refreshToken = res.body.refresh_token;
    });

    it('should return 200 and new tokens when valid refresh token is sent', () => {
      return request(app!.getHttpServer())
        .post('/api/v1/auth/refresh')
        .set('Authorization', `Bearer ${refreshToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
          expect(res.body).toHaveProperty('refresh_token');
        });
    });

    it('should return 401 when Authorization header is missing', () => {
      return request(app!.getHttpServer()).post('/api/v1/auth/refresh').expect(401);
    });

    it('should return 401 when Bearer token is invalid', () => {
      return request(app!.getHttpServer())
        .post('/api/v1/auth/refresh')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
  });
});
