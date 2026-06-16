import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      // Simulamos Prisma para no necesitar el .env.test ni conexión real
      .overrideProvider(PrismaService)
      .useValue({
        $connect: jest.fn(),
        usuario: {
          findUnique: jest.fn().mockResolvedValue(null),
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Cambiamos la prueba para testear nuestro nuevo endpoint de Login
  it('/auth/login (POST) - Debe retornar 401 con credenciales falsas', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ correo: 'test@gmail.com', password: '123' })
      .expect(401);
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });
});
