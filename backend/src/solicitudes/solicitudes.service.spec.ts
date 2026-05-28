/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudesService } from './solicitudes.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrismaService = {
  solicitudImpresion: {
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe('SolicitudesService', () => {
  let service: SolicitudesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SolicitudesService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<SolicitudesService>(SolicitudesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería crear una solicitud de impresión exitosamente', async () => {
    const datosNuevaSolicitud = { nombreProyecto: 'Engranaje', idUsuario: 1 };
    const respuestaFingida = {
      id: '1',
      ...datosNuevaSolicitud,
      estado: 'PENDIENTE',
    };

    mockPrismaService.solicitudImpresion.create.mockResolvedValue(
      respuestaFingida,
    );
    const resultado = await service.create(datosNuevaSolicitud);

    expect(prisma.solicitudImpresion.create).toHaveBeenCalledTimes(1);
    expect(resultado.estado).toBe('PENDIENTE');
  });

  it('debería actualizar el estado a FINALIZADA', async () => {
    const respuestaFingidaCerrada = {
      id: '1',
      nombreProyecto: 'Engranaje',
      estado: 'FINALIZADA',
    };
    mockPrismaService.solicitudImpresion.update.mockResolvedValue(
      respuestaFingidaCerrada,
    );

    const resultado = await service.update('1', { estado: 'FINALIZADA' });

    expect(prisma.solicitudImpresion.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { estado: 'FINALIZADA' },
    });
    expect(resultado.estado).toBe('FINALIZADA');
  });
});
