/// <reference types="jest" />
/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
          
            registrarUsuario: jest.fn(),
            loginUsuario: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  it('debería estar definido', () => {
    expect(appController).toBeDefined();
  });

  it('debería llamar al servicio al registrar un usuario', async () => {
    const mockData = {
      correo: 'test@gmail.com',
      password: '123',
      nombreCompleto: 'Estudiante Test',
      rol: 'ESTUDIANTE',
    };
    jest
      .spyOn(appService, 'registrarUsuario')
      .mockResolvedValue({ id: '1', ...mockData } as any);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const resultado = await appController.registrar(mockData as any);
    expect(appService.registrarUsuario).toHaveBeenCalledWith(mockData);
    expect(resultado).toHaveProperty('id', '1');
  });

  it('debería llamar al servicio al hacer login', async () => {
    const credenciales = { correo: 'test@gmail.com', password: '123' };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    jest.spyOn(appService, 'loginUsuario').mockResolvedValue({
      id: '1',
      rol: 'ESTUDIANTE',
      nombreCompleto: 'Estudiante Test',
    } as any);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const resultado = await appController.login(credenciales as any);
    expect(appService.loginUsuario).toHaveBeenCalledWith(credenciales);
    expect(resultado.rol).toBe('ESTUDIANTE');
  });

  // Funcionalidad menor
  it('debería retornar el estado de salud del servidor', () => {
    expect(appController.verificarEstado()).toEqual({ status: 'MakerBox API 100% Operativa' });
  });
});
