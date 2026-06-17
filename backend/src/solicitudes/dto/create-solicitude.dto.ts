import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateSolicitudeDto {
  @IsString()
  nombreProyecto!: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsString()
  archivoDiseno3D!: string;

  @IsString()
  archivoStl!: string;

  @IsUUID()
  autorId!: string;
}
