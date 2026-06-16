import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { AppService } from './app.service';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('registro')
  async registrar(@Body() body: RegistroDto) {
    console.log('Datos recibidos en NestJS:', body);
    return this.appService.registrarUsuario(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    console.log('Intento de login para:', body.correo);
    return this.appService.loginUsuario(body);
  }
}
