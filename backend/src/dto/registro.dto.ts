export class RegistroDto {
  nombreCompleto!: string;
  rut!: string;
  correo!: string;
  password!: string;
  rol!: 'ESTUDIANTE' | 'AYUDANTE';
}
