/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SolicitudesService {
  constructor(private prisma: PrismaService) {}

  async create(datosNuevaSolicitud: any) {
    return await this.prisma.solicitudImpresion.create({
      data: {
        ...datosNuevaSolicitud,
        estado: 'PENDIENTE',
      },
    });
  }

  async update(id: string, datosActualizar: any) {
    return await this.prisma.solicitudImpresion.update({
      where: { id },
      data: datosActualizar,
    });
  }
}
