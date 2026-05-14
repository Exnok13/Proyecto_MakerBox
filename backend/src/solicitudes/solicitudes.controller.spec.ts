import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudesController } from './solicitudes.controller';
import { SolicitudesService } from './solicitudes.service';
import { PrismaService } from '../prisma/prisma.service'; // Importamos Prisma

describe('SolicitudesController', () => {
  let controller: SolicitudesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolicitudesController],
      providers: [
        SolicitudesService,
        // Le entregamos un simulador vacío a NestJS para que no se queje
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    controller = module.get<SolicitudesController>(SolicitudesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
