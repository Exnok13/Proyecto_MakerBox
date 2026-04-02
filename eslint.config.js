import js from '@eslint/js';

export default [
  js.configs.recommended, // Activa las reglas básicas (evita errores comunes)
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'semi': ['error', 'always'],   // Punto y coma obligatorio
      'quotes': ['error', 'single'], // Comillas simples obligatorias
      'no-var': 'error',             // Prohibido usar 'var'
      'prefer-const': 'error'        // Obliga a usar 'const' si no cambia
    }
  },
  {
    // Ignorar carpetas pesadas o automáticas
    ignores: ['node_modules/', 'dist/', 'build/']
  }
];