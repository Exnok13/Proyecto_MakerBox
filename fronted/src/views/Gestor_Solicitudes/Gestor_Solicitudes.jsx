import React, { useState, useEffect } from 'react';
import './Gestor_Solicitudes.css';

export default function GestionSolicitudes() {
    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
    const cargarSolicitudes = async () => {
      try {
        const respuesta = await fetch('http://localhost:3000/solicitudes');
        if (respuesta.ok) {
          const datos = await respuesta.json();
          if (Array.isArray(datos)) {
            setSolicitudes(datos);
          } else {
            setSolicitudes([]);
          }
        } else {
           
          console.error('Error al leer las solicitudes del servidor');
        }
      } catch (error) {
         
        console.error('Error de red al conectar con el backend:', error);
      }
    };

    cargarSolicitudes();
  }, []);

    const estadosPermitidos = ['PENDIENTE', 'APROBADA', 'RECHAZADA', 'EN_IMPRESION', 'FINALIZADA'];
    
    const manejarCambioEstado = async (id, nuevoEstado) => {
    setSolicitudes(solicitudesPrevias =>
      solicitudesPrevias.map(solicitud =>
        solicitud.id === id ? { ...solicitud, estado: nuevoEstado } : solicitud
      )
    );

    try {
      const respuesta = await fetch(`http://localhost:3000/solicitudes/${id}/estado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (!respuesta.ok) {
        console.error('El backend rechazó el cambio de estado');
    }
    } catch (error) {
      console.error('Error de red al intentar actualizar:', error);
    }
  };

    return (
        <div className="gestion-container">
        <h2>Panel de Gestión de Solicitudes</h2>
        
        <table className="tabla-solicitudes">
            <thead>
            <tr>
                <th>Estudiante</th>
                <th>Proyecto</th>
                <th>Archivos 3D</th>
                <th>Estado Actual</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {solicitudes.map((solicitud) => (

                <tr key={solicitud.id} className={`fila-estado-${solicitud.estado.toLowerCase()}`}>
                
                <td>{solicitud.autor?.nombreCompleto || 'Usuario Desconocido'}</td>
                <td>{solicitud.nombreProyecto}</td>
                
                <td>
                    <div className="archivos-links">
                    {solicitud.archivoStl && <span className="badge stl">STL: {solicitud.archivoStl}</span>}
                    {solicitud.archivoDiseno3D && <span className="badge obj">OBJ: {solicitud.archivoDiseno3D}</span>}
                    </div>
                </td>
                <td>
                    <span className={`status-label ${solicitud.estado.toLowerCase()}`}>
                    {solicitud.estado}
                    </span>
                </td>
                <td>
                    <select
                    value={solicitud.estado}
                    onChange={(e) => manejarCambioEstado(solicitud.id, e.target.value)}
                    className="select-estado"
                    >
                    {estadosPermitidos.map((est) => (
                        <option key={est} value={est}>
                        {est}
                        </option>
                    ))}
                    </select>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

