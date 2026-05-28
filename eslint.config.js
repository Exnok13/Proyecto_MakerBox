import js from '@eslint/js';

export default [
  js.configs.recommended,
  {


    ignores: [
    'backend/generated/**', 
    'fronted/dist/**', 
    'node_modules/', 
    'dist/', 
    'build/'
  ]
  
  },
  {
   
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'semi': ['error', 'always'],   // Punto y coma obligatorio
      'quotes': ['error', 'single'], // Comillas simples obligatorias
      'no-var': 'error',             // Prohibido usar 'var'
      'prefer-const': 'error'        // Obliga a usar 'const' si no cambia
    }
  }
  
];