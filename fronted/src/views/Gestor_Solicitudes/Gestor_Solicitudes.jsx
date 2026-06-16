import React, { useState } from 'react';
import './Gestor_Solicitudes.css';

export default function GestionSolicitudes() {
    const [solicitudes, setSolicitudes] = useState([
        //Datos que vendrían de una API o base de datos
    ]);

    const estadosPermitidos = ['Retenido', 'Aprobado', 'Rechazado', 'Imprimiendo', 'Terminado'];

    const manejarCambioEstado = (id, nuevoEstado) => {
        setSolicitudes(solicitudesPrevias =>
        solicitudesPrevias.map(solicitud =>
            solicitud.id === id ? { ...solicitud, estado: nuevoEstado } : solicitud
        )
        );
        
        console.log(`Solicitud ${id} cambiada al estado: ${nuevoEstado}`);
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
                <td>{solicitud.nombreEstudiante}</td>
                <td>{solicitud.nombreProyecto}</td>
                <td>
                    <div className="archivos-links">
                    {solicitud.archivoStl && <span className="badge stl">STL: {solicitud.archivoStl}</span>}
                    {solicitud.archivoObj && <span className="badge obj">OBJ: {solicitud.archivoObj}</span>}
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

