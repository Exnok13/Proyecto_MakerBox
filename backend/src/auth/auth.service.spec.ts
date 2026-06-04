import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service'; // ¡Cambio aquí! Salimos de 'auth' y entramos a 'prisma'

describe('AuthService - Registro de Estudiante', () => {
  let service: AuthService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            usuario: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('Debería registrar un estudiante nuevo con el rol ESTUDIANTE', async () => {
    const datosRegistro = {
      rut: '19123456-7',
      nombreCompleto: 'Juan Pérez',
      correo: 'juan.perez@alumnos.utalca.cl',
      password: 'password123',
    };

    const mockRespuestaPrisma = {
      id: 'uuid-123',
      ...datosRegistro,
      password: 'hash-encriptado',
      rol: 'ESTUDIANTE',
    };

    (prisma.usuario.create as jest.Mock).mockResolvedValue(mockRespuestaPrisma);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const resultado = await service.register(datosRegistro);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prisma.usuario.create).toHaveBeenCalledWith({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: expect.objectContaining({
        correo: datosRegistro.correo,
        rol: 'ESTUDIANTE',
      }),
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(resultado.correo).toBe(datosRegistro.correo);
  });
});
