import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Layout-Header.css';

export default function Header() {
  const navigate = useNavigate();

  const rolUsuario = localStorage.getItem('userRol');

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioActivoId');
    localStorage.removeItem('userRol');
    navigate('/login');
  };

  return (
    <header className="main-header">

      <div className="logo-container">
        <Link to="/">
          <span className="logo-text">MAKER<span>BOX</span></span>
        </Link>
      </div>

      <nav className="nav-menu">
        <ul className="nav-list">

          {!rolUsuario && (
            <li><Link to="/login" className="nav-button">Login</Link></li>
          )}

          {rolUsuario && (
            <>
              <li><Link to="/gestor-solicitudes" className="nav-button">Proyectos</Link></li>   
              <li><Link to="/solicitudes" className="nav-button">Solicitudes</Link></li>
              <li><Link to="/login" className="nav-button" onClick={cerrarSesion}>Cerrar Sesión</Link></li>
            </>
          )}

        </ul>
      </nav>
    </header>
  );
}
