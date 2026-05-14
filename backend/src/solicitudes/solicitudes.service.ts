/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SolicitudesService {
  // 1. Inyectamos la base de datos (Prisma) en el servicio
  constructor(private prisma: PrismaService) {}

  // 2. Lógica real para crear la solicitud
  async create(datosNuevaSolicitud: any) {
    return await this.prisma.solicitudImpresion.create({
      data: {
        ...datosNuevaSolicitud,
        estado: 'PENDIENTE',
      },
    });
  }

  // 3. Lógica real para actualizar el estado
  async update(id: number, datosActualizar: any) {
    return await this.prisma.solicitudImpresion.update({
      where: { id },
      data: datosActualizar,
    });
  }

  // (Puedes dejar los demás métodos como findAll o remove que generó NestJS abajo sin problemas)
}
