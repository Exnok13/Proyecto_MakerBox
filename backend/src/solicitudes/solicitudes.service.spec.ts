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
    const datosNuevaSolicitud = {
      nombreProyecto: 'Engranaje Robot',
      idUsuario: 1,
    };
    const respuestaFingidaDeBD = {
      id: 100,
      ...datosNuevaSolicitud,
      estado: 'PENDIENTE',
    };

    mockPrismaService.solicitudImpresion.create.mockResolvedValue(
      respuestaFingidaDeBD,
    );

    const resultado = await service.create(datosNuevaSolicitud);

    expect(prisma.solicitudImpresion.create).toHaveBeenCalledTimes(1);
    expect(resultado).toEqual(respuestaFingidaDeBD);
    expect(resultado.estado).toBe('PENDIENTE');
  });

  it('debería cerrar (finalizar) la solicitud correctamente', async () => {
    const idSolicitud = 100;
    const respuestaFingidaCerrada = {
      id: idSolicitud,
      nombreProyecto: 'Engranaje Robot',
      estado: 'FINALIZADA',
    };

    mockPrismaService.solicitudImpresion.update.mockResolvedValue(
      respuestaFingidaCerrada,
    );

    const resultado = await service.update(idSolicitud, {
      estado: 'FINALIZADA',
    });

    expect(prisma.solicitudImpresion.update).toHaveBeenCalledWith({
      where: { id: idSolicitud },
      data: { estado: 'FINALIZADA' },
    });

    expect(resultado.estado).toBe('FINALIZADA');
  });
});
