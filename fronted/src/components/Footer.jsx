import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import './Layout-Footer.css';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
       
        <div className="footer-info">
          <p>&copy; {new Date().getFullYear()} <strong>MakerBox</strong></p>
        </div>

        <div className="social-icons">
          <a></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}