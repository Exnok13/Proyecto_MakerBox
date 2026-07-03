import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SolicitudesService } from './solicitudes.service';
import { CreateSolicitudeDto } from './dto/create-solicitude.dto';
import { EstadoSolicitud } from '@prisma/client';
import { ActualizarEstadoDto } from './dto/Cambiar_Solicitudes.dto';
/* eslint-disable */
@Controller('solicitudes')
export class SolicitudesController {
  constructor(private readonly solicitudesService: SolicitudesService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'archivoStl', maxCount: 1 },
    { name: 'archivoDiseno3D', maxCount: 1 },
  ], {
    storage: diskStorage({
      destination: './uploads/proyectos', 
      filename: (req: any, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const sufijoUnico = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${sufijoUnico}${extname(file.originalname)}`);
      }
    })
  }))
  create(
    @Body() createSolicitudeDto: CreateSolicitudeDto,
    @UploadedFiles() files: { archivoStl?: Express.Multer.File[], archivoDiseno3D?: Express.Multer.File[] }
  ) {
    if (files?.archivoStl) {
      createSolicitudeDto.archivoStl = files.archivoStl[0].path;
    }
    if (files?.archivoDiseno3D) {
      createSolicitudeDto.archivoDiseno3D = files.archivoDiseno3D[0].path;
    }
    return this.solicitudesService.create(createSolicitudeDto);
  }

  @Get()
  findAll() {
    return (this.solicitudesService as any).findAll();
  }

  @Patch(':id/estado')
  updateEstado(
    @Param('id') id: string,
    @Body('estado') estado: EstadoSolicitud,
  ) {
    return (this.solicitudesService as any).updateEstado(id, estado);
  }

  @Patch(':id/estado')
  async actualizarEstado(
    @Param('id') id: string, 
    @Body() body: ActualizarEstadoDto
  ) {
    console.log(`Actualizando solicitud ${id} al estado: ${body.estado}`);
    return this.solicitudesService.actualizarEstado(id, body.estado);
  }
}
/* eslint-enable @typescript-eslint/no-unsafe-call */