import { useState } from 'react';
import './Front_Solicitudes.css';
import { useNavigate } from 'react-router-dom';

export default function Front_Solicitudes() {

  const navegar = useNavigate();

  const [datosFormulario, setDatosFormulario] = useState({
    nombreProyecto: '',
    descripcion: '',
    archivoStl: null,
    archivoObj: null,
  });

  const manejarCambioTexto = (evento) => {
    const { name, value } = evento.target;
    setDatosFormulario({ ...datosFormulario, [name]: value });
  };

  const manejarCambioArchivo = (evento) => {
    const { name, files } = evento.target;
    setDatosFormulario({ ...datosFormulario, [name]: files[0] });
  };

  const enviarFormulario = async (evento) => {
    evento.preventDefault();

    const idUsuarioActivo = localStorage.getItem('usuarioActivoId');

    if (!idUsuarioActivo) {
      alert('Debes iniciar sesión para enviar una solicitud.');
      navegar('/login'); 
      return; 
    }
    const formData = new FormData();
    formData.append('nombreProyecto', datosFormulario.nombreProyecto);
    formData.append('descripcion', datosFormulario.descripcion);
    formData.append('archivoStl', datosFormulario.archivoStl);
    
    if (datosFormulario.archivoObj) {
      formData.append('archivoDiseno3D', datosFormulario.archivoObj);
    }

    formData.append('autorId', idUsuarioActivo);

    try {
      const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/solicitudes`, {
        method: 'POST',
        body: formData,
      });

      if (respuesta.ok) {
        alert('¡Tu solicitud ha sido registrada correctamente!');
        setDatosFormulario({
          nombreProyecto: '',
          descripcion: '',
          archivoStl: null,
          archivoObj: null,
        });
      } else {
        const infoError = await respuesta.json();
         
        console.error('El servidor rechazó la petición:', infoError);
        alert('Hubo un error al procesar tu solicitud. Revisa la consola.');
      }
    } catch (error) {
       
      console.error('Error de red o CORS:', error);
      alert('No se pudo conectar con el servidor backend.');
    }
  };

  return (
    <div className="page-wrapper">
      
      <main className="main-content">
        <div className="form-card">
          <h1 className="form-title">Solicitud de Impresión 3D</h1>
          <p className="form-subtitle">Ingresa los detalles de tu modelo para evaluación.</p>

          <form onSubmit={enviarFormulario} className="print-form">
            
            <div className="form-group">
              <label htmlFor="nombreProyecto">Nombre del Proyecto</label>
              <input
                type="text"
                id="nombreProyecto"
                name="nombreProyecto"
                value={datosFormulario.nombreProyecto}
                onChange={manejarCambioTexto}
                placeholder="Ej. Prototipo de engranaje"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={datosFormulario.descripcion}
                onChange={manejarCambioTexto}
                placeholder="Explica el propósito, dimensiones estimadas, urgencia..."
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="archivoStl">Archivo del Diseño (.STL)</label>
              <input
                type="file"
                id="archivoStl"
                name="archivoStl"
                accept=".stl"
                onChange={manejarCambioArchivo}
                required
                className="file-input"
              />
              <small className="file-help">Solo se aceptan archivos en formato STL.</small>
            </div>

            <div className="form-group">
                <label htmlFor="archivoObj">Archivo OBJ</label>
                <input
                  type="file"
                  id="archivoObj"
                  name="archivoObj"
                  accept=".obj"
                  onChange={manejarCambioArchivo}
                  className="file-input"
                />
                <small className="file-help">Solo se aceptan archivos en formato OBJ.</small>
              </div>

            <button type="submit" className="submit-btn">Enviar Solicitud</button>
          </form>
        </div>
      </main>

    </div>
  );
}