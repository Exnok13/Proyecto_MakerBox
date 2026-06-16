import './Layout-Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="main-header">

      <div className="logo-container">
        <Link to="/">
          <span className="logo-text">MAKER<span>BOX</span></span>
        </Link>
      </div>

      <nav className="nav-menu">
        <ul className="nav-list">
          <li><Link to="/" className="nav-button">Inicio</Link></li>
          <li><Link to="/gestor-solicitudes" className="nav-button">Proyectos</Link></li>
          <li><Link to="/login" className="nav-button">Login</Link></li>
          <li><Link to="/solicitudes" className="nav-button">Solicitudes</Link></li>
        </ul>
      </nav>
    </header>
  );
}