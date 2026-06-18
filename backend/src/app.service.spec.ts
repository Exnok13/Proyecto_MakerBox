/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UnauthorizedException } from '@nestjs/common';

// Local DTO typings for tests to avoid unsafe `any` casts
type RegistroDto = {
  correo: string;
  password: string;
  nombreCompleto: string;
  rol: 'AYUDANTE' | 'ESTUDIANTE';
  rut: string;
};

type LoginDto = {
  correo: string;
  password: string;
};

describe('AppService', () => {
  let service: AppService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: PrismaService,
          useValue: {
            usuario: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);

    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  // --- PRUEBAS DEL FLUJO DE REGISTRO ---
  it('debería registrar un usuario exitosamente', async () => {
    // Simulamos que el correo está libre
    jest.spyOn(prisma.usuario, 'findUnique').mockResolvedValue(null);
    // Simulamos la creación exitosa agregando el rut a la respuesta falsa
    jest.spyOn(prisma.usuario, 'create').mockResolvedValue({
      id: '1',
      rut: '12345678-9',
      correo: 'nuevo@gmail.com',
      password: '123',
      nombreCompleto: 'Nuevo Estudiante',
      rol: 'ESTUDIANTE',
    });

    // Le pasamos el rut a la función que estamos probando
    const resultado = await service.registrarUsuario({
      rut: '12345678-9',
      correo: 'nuevo@gmail.com',
      password: '123',
      nombreCompleto: 'Nuevo Estudiante',
      rol: 'ESTUDIANTE',
    } as RegistroDto);

    expect(resultado).toBeDefined();
    expect(prisma.usuario.create).toHaveBeenCalledTimes(1);
  });

  // --- PRUEBAS DEL FLUJO DE LOGIN ---
  it('debería hacer login exitosamente con credenciales correctas', async () => {
    // Simulamos que Prisma encuentra al usuario en la base de datos
    jest.spyOn(prisma.usuario, 'findUnique').mockResolvedValue({
      rut: '12345678-9',
      id: '1',
      correo: 'test@gmail.com',
      password: '123',
      nombreCompleto: 'Test Usuario',
      rol: 'ESTUDIANTE',
    });

    const resultado = await service.loginUsuario({
      correo: 'test@gmail.com',
      password: '123',
    } as LoginDto);

    expect(resultado).toBeDefined();
    expect(prisma.usuario.findUnique).toHaveBeenCalled();
  });

  it('debería arrojar error UnauthorizedException si el usuario no existe o la contraseña es mala', async () => {
    // Simulamos que la base de datos no encuentra el correo
    jest.spyOn(prisma.usuario, 'findUnique').mockResolvedValue(null);

    await expect(
      service.loginUsuario({
        correo: 'falso@gmail.com',
        password: '123',
      } as LoginDto),
    ).rejects.toThrow(UnauthorizedException);
  });
});
