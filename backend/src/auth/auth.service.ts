import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register(datosRegistro: any): Promise<any> {
    return Promise.reject(new Error('Método no implementado aún'));
  }
}
