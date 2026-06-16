import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async registrarUsuario(data: RegistroDto) {
    return this.prisma.usuario.create({
      data: {
        nombreCompleto: data.nombreCompleto,
        rut: data.rut,
        correo: data.correo,
        password: data.password,
        rol: data.rol,
      },
    });
  }

  async loginUsuario(data: LoginDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { correo: data.correo },
    });

    if (!usuario || usuario.password !== data.password) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    const { password, ...usuarioSinPassword } = usuario;
    void password;
    return usuarioSinPassword;
  }
}
