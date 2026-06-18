/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudesController } from './solicitudes.controller';
import { SolicitudesService } from './solicitudes.service';

describe('SolicitudesController', () => {
  let controller: SolicitudesController;
  let service: SolicitudesService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolicitudesController],
      providers: [
        {
          provide: SolicitudesService,
          useValue: {
            create: jest
              .fn()
              .mockResolvedValue({ id: '1', nombreProyecto: 'Proyecto Test' }),
            actualizarEstado: jest
              .fn()
              .mockResolvedValue({ id: '1', estado: 'APROBADA' }),
          },
        },
      ],
    }).compile();

    controller = module.get<SolicitudesController>(SolicitudesController);
    service = module.get<SolicitudesService>(SolicitudesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('debe llamar a crearSolicitud del servicio', async () => {
    const dto = {
      nombreProyecto: 'Proyecto Test',
      archivoDiseno3D: 'a.obj',
      archivoStl: 'b.stl',
      autorId: '123',
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
    const resultado = await controller.create(dto as any, {} as any);
    expect(resultado).toEqual({ id: '1', nombreProyecto: 'Proyecto Test' });
    expect(service.create).toHaveBeenCalled();
  });

  it('debe llamar a actualizarEstado del servicio', async () => {
    const dto = { estado: 'APROBADA' as any };
    const resultado = await controller.actualizarEstado('1', dto);
    expect(resultado).toEqual({ id: '1', estado: 'APROBADA' });
    expect(service.actualizarEstado).toHaveBeenCalledWith('1', 'APROBADA');
  });
});
