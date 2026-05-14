import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { SolicitudesService } from './solicitudes.service';
import { CreateSolicitudeDto } from './dto/create-solicitude.dto';
import { UpdateSolicitudeDto } from './dto/update-solicitude.dto';

@Controller('solicitudes')
export class SolicitudesController {
  constructor(private readonly solicitudesService: SolicitudesService) {}

  @Post()
  create(@Body() createSolicitudeDto: CreateSolicitudeDto) {
    return this.solicitudesService.create(createSolicitudeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSolicitudeDto: UpdateSolicitudeDto,
  ) {
    return this.solicitudesService.update(id, updateSolicitudeDto);
  }
}
