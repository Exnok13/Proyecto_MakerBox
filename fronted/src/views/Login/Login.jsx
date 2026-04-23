import React from 'react';
import './Login.css';

function Login() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '24px', color: '#8d0000' }}>MakerBox</h1>
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        <input type="email" placeholder="Correo institucional" style={{ padding: '10px', width: '250px' }} />
        <input type="password" placeholder="Contraseña" style={{ padding: '10px', width: '250px' }} />
        <button style={{ padding: '10px 20px', backgroundColor: '#8d0000', color: 'white', border: 'none', cursor: 'pointer' }}>
          Iniciar Sesión
        </button>
      </div>
      <div className="login-footer">
          <span style={{color: '#ffffff' }}>¿No tienes cuenta? </span>
          <button className="register-link" onClick={() => console.log("Ir a registro")}>
            Regístrate aquí
          </button>
        </div>
    </div>
  );
}

export default Login;