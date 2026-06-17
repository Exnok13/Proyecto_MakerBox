import { Injectable } from '@nestjs/common';
import { CreateSolicitudeDto } from './dto/create-solicitude.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EstadoSolicitud } from '@prisma/client';

@Injectable()
export class SolicitudesService {
  constructor(private prisma: PrismaService) {}

  async create(createSolicitudeDto: CreateSolicitudeDto) {
    return this.prisma.solicitudImpresion.create({
      data: createSolicitudeDto,
    });
  }

  async findAll() {
    return this.prisma.solicitudImpresion.findMany({
      include: {
        autor: {
          select: { nombreCompleto: true },
        },
      },
      orderBy: { fechaSolicitud: 'desc' },
    });
  }

  async updateEstado(id: string, estado: EstadoSolicitud) {
    return await this.prisma.solicitudImpresion.update({
      where: { id },
      data: { estado },
    });
  }
}
