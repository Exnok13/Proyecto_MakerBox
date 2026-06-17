export class ActualizarEstadoDto {
  estado!:
    | 'PENDIENTE'
    | 'APROBADA'
    | 'RECHAZADA'
    | 'EN_IMPRESION'
    | 'FINALIZADA';
}
