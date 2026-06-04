import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Usuario } from '@prisma/client';

type RegisterDto = {
  rut: string;
  nombreCompleto: string;
  correo: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(datosRegistro: RegisterDto): Promise<Usuario> {
    const { rut, nombreCompleto, correo, password } = datosRegistro;

    const nuevoUsuario = await this.prisma.usuario.create({
      data: {
        rut,
        nombreCompleto,
        correo,
        password,
        rol: 'ESTUDIANTE',
      },
    });

    return nuevoUsuario;
  }
}
