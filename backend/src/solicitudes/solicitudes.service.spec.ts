/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudesService } from './solicitudes.service';
import { PrismaService } from '../prisma/prisma.service';
import { EstadoSolicitud } from '@prisma/client';

const mockPrismaService = {
  solicitudImpresion: {
    create: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
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
    const datosNuevaSolicitud: {
      nombreProyecto: string;
      autorId: string;
      archivoDiseno3D: string;
      archivoStl: string;
    } = {
      nombreProyecto: 'Engranaje',
      autorId: 'uuid-123',
      archivoDiseno3D: 'diseno.obj',
      archivoStl: 'modelo.stl',
    };
    const respuestaFingida = {
      id: '1',
      ...datosNuevaSolicitud,
      estado: 'PENDIENTE',
    };

    mockPrismaService.solicitudImpresion.create.mockResolvedValue(
      respuestaFingida,
    );

    const resultado = (await service.create(datosNuevaSolicitud)) as {
      estado: string;
    };
    expect(prisma.solicitudImpresion.create).toHaveBeenCalledTimes(1);
    expect(resultado.estado).toBe('PENDIENTE');
  });

  it('debería actualizar el estado correctamente', async () => {
    const respuestaFingidaCerrada = {
      id: '1',
      nombreProyecto: 'Engranaje',
      estado: 'TERMINADO',
    };

    mockPrismaService.solicitudImpresion.update.mockResolvedValue(
      respuestaFingidaCerrada,
    );

    const resultado = (await service.updateEstado(
      '1',
      'TERMINADO' as EstadoSolicitud,
    )) as { estado: string };

    expect(prisma.solicitudImpresion.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { estado: 'TERMINADO' },
    });
    expect(resultado.estado).toBe('TERMINADO');
  });

  it('debería obtener todas las solicitudes', async () => {
    // 1. Simulamos una lista de solicitudes que devolvería la base de datos
    const mockSolicitudes = [
      { id: '1', nombreProyecto: 'Engranaje', estado: 'PENDIENTE' },
      { id: '2', nombreProyecto: 'Carcasa', estado: 'EN_IMPRESION' },
    ];

    mockPrismaService.solicitudImpresion.findMany.mockResolvedValue(
      mockSolicitudes,
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const resultado = await service.findAll();
    expect(prisma.solicitudImpresion.findMany).toHaveBeenCalledTimes(1);
    expect(resultado).toEqual(mockSolicitudes);
  });
});
