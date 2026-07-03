import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/Login/Login';
import Front_Solicitudes from './views/Front_Solicitudes/Front_Solicitudes';
import Header from './components/Header';
import Footer from './components/Footer';
import Registro from './views/Registro/Registro';
import Gestor_Solicitudes from './views/Gestor_Solicitudes/Gestor_Solicitudes';
import './App.css';

function App() {
  
  return (
    <Router>
      <div className="app-container">
        <Header />
        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/solicitudes" element={<Front_Solicitudes />} />
          <Route path="/gestor-solicitudes" element={<Gestor_Solicitudes />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;