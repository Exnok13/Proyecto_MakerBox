import { useState } from 'react';
import './Front_Solicitudes.css';

export default function Front_Solicitudes() {
  // Estado con un nombre claro que indica su propósito
  const [datosFormulario, setDatosFormulario] = useState({
    nombreProyecto: '',
    descripcion: '',
    archivoStl: null,
    archivoObj: null,
  });

  // Función específica para los inputs de escritura (texto)
  const manejarCambioTexto = (evento) => {
    const { name, value } = evento.target;
    setDatosFormulario({ ...datosFormulario, [name]: value });
  };

  // Función específica para la subida de documentos
  const manejarCambioArchivo = (evento) => {
    const { name, files } = evento.target;
    setDatosFormulario({ ...datosFormulario, [name]: files[0] });
  };

  // Función final que procesa el envío
  const enviarFormulario = (evento) => {
    evento.preventDefault();
    console.log('Datos listos para enviar:', datosFormulario);
    alert('¡Tu solicitud ha sido registrada correctamente!');
    // Aquí iría el apartado para enviar los datos al backend
  };

  return (
    <div className="page-wrapper">
      
      {/* Contenido principal centrado */}
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