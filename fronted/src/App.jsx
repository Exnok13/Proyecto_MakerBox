import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/Login/Login';
import Front_Solicitudes from './views/Front_Solicitudes/Front_Solicitudes';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  
  return (
    <Router>
      <div className="app-container">
        {/* Componente estático global */}
        <Header />
        
        {/* Gestor de rutas dinámicas */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/solicitudes" element={<Front_Solicitudes />} />
        </Routes>

        {/* Componente estático global */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;