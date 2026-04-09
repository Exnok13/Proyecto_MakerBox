import './Layout-Header.css';

export default function Header() {
  return (
    <header className="main-header">
      {/* Logo Visible */}
      <div className="logo-container">
        <a href="/">
  
          <span className="logo-text">MAKER<span>BOX</span></span>
        </a>
      </div>

      {/*Botones Clicables */}
      <nav className="nav-menu">
        <ul className="nav-list">
          <li><a href="#inicio" className="nav-button">Inicio</a></li>
          <li><a href="#proyectos" className="nav-button">Proyectos</a></li>
          <li><a href="#contacto" className="nav-button">Login</a></li>
        </ul>
      </nav>
    </header>
  );
}