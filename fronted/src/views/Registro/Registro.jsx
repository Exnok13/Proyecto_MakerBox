import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registro.css';

function Registro() {
  const navigate = useNavigate();


  const [nombreCompleto, setNombreCompleto] = useState('');
  const [rut, setRut] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    const nuevoUsuario = {
      nombreCompleto,
      rut,
      correo,
      password,
      rol
    };

    try {
    
      const response = await fetch('http://localhost:3000/auth/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoUsuario),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('¡Respuesta del backend!', data);
        alert('¡Cuenta creada con éxito!');
        navigate('/'); 
      } else {
        alert('Hubo un problema al crear la cuenta. Revisa la consola.');
      }
    } catch (error) {
      console.error('Error conectando con el servidor:', error);
      alert('Error de conexión con el backend.');
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '24px', color: '#8d0000' }}>Registro MakerBox</h1>
      
      {}
      <form onSubmit={handleSubmit} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        
        <input 
          type="text" 
          placeholder="Nombre Completo" 
          value={nombreCompleto}
          onChange={(e) => setNombreCompleto(e.target.value)}
          style={{ padding: '10px', width: '250px' }} 
          required
        />
        
        <input 
          type="text" 
          placeholder="RUT (ej: 12345678-9)" 
          value={rut}
          onChange={(e) => setRut(e.target.value)}
          style={{ padding: '10px', width: '250px' }} 
          required
        />
        
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
        
        <select 
          value={rol} 
          onChange={(e) => setRol(e.target.value)}
          style={{ padding: '10px', width: '274px', cursor: 'pointer', backgroundColor: 'white' }}
          required
        >
          <option value="" disabled>Selecciona tu rol</option>
          <option value="ESTUDIANTE">Estudiante</option>
          <option value="AYUDANTE">Ayudante</option>
        </select>
        
        {}
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#8d0000', color: 'white', border: 'none', cursor: 'pointer', marginTop: '10px' }}>
          Crear Cuenta
        </button>

      </form>

      <div className="register-footer" style={{ marginTop: '20px' }}>
        <span style={{ color: '#ffffff' }}>¿Ya tienes cuenta? </span>
        <button 
          type="button"
          onClick={() => navigate('/')} 
          style={{ background: 'none', border: 'none', color: '#8d0000', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Inicia sesión aquí
        </button>
      </div>
    </div>
  );
}

export default Registro;