import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {

  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('¡Login exitoso!', data);
        alert(`¡Bienvenido ${data.nombreCompleto}!`);
        if (data.rol === 'ESTUDIANTE') {
          navigate('/solicitudes');
        } else if (data.rol === 'AYUDANTE') {
         alert('pagina en proceso.');
        } else {
          alert('pagina en proceso.');
        }
      }
    } catch (error) {
      console.error('Error conectando con el servidor:', error);
      alert('Error de conexión con el backend.');
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '24px', color: '#8d0000' }}>MakerBox</h1>
      
      {/* 3. Envolvemos en un form con onSubmit */}
      <form onSubmit={handleSubmit} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        
        <input 
          type="email" 
          placeholder="Correo institucional" 
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          style={{ padding: '10px', width: '250px' }} 
          required
        />
        
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', width: '250px' }} 
          required
        />
        
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#8d0000', color: 'white', border: 'none', cursor: 'pointer' }}>
          Iniciar Sesión
        </button>
      </form>

      <div className="login-footer" style={{ marginTop: '20px' }}>
        <span style={{ color: '#ffffff' }}>¿No tienes cuenta? </span>
        <button 
          className="register-link" 
          type="button"
          onClick={() => navigate('/registro')} 
          style={{ background: 'none', border: 'none', color: '#8d0000', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Regístrate aquí
        </button>
      </div>
    </div>
  );
}

export default Login;
