import * as dotenv from 'dotenv';
import * as path from 'path';

const envPath = path.resolve(process.cwd(), '.env.test');
const result = dotenv.config({ path: envPath, override: true });

if (result.error) {
  console.log('ERROR: No se pudo encontrar el archivo .env.test en:', envPath);
} else {
  console.log('🚀 .env.test cargado con éxito desde:', envPath);
  console.log('🔗 DATABASE_URL actual de pruebas:', process.env.DATABASE_URL);
}
