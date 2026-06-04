import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Front_Solicitudes from '../src/views/Front_Solicitudes/Front_Solicitudes.jsx';

describe('Pruebas de Integración: Front_Solicitudes', () => {
  it('Debe rellenar los campos, subir archivos y enviar el formulario con éxito', () => {
    //1.PREPARAR: Renderizamos el componente y "secuestramos" el alert para que no bloquee la prueba
    const mockAlerta = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Front_Solicitudes />);

    const inputNombre = screen.getByLabelText(/Nombre del Proyecto/i);
    const inputDescripcion = screen.getByLabelText(/Descripción/i);
    
    fireEvent.change(inputNombre, { target: { value: 'Prueba de Test' } });
    fireEvent.change(inputDescripcion, { target: { value: 'Descripción para Test' } });

    const archivoStl = new File(['(contenido)'], 'pieza.stl', { type: 'model/stl' });
    const archivoObj = new File(['(contenido)'], 'pieza.obj', { type: 'model/obj' });

    const inputStl = screen.getByLabelText(/Archivo del Diseño \(\.STL\)/i);
    const inputObj = screen.getByLabelText(/Archivo OBJ/i);

    fireEvent.change(inputStl, { target: { files: [archivoStl] } });
    fireEvent.change(inputObj, { target: { files: [archivoObj] } });

    const botonEnviar = screen.getByRole('button', { name: /Enviar Solicitud/i });
    const formulario = botonEnviar.closest('form'); 
    fireEvent.submit(formulario);

    expect(mockAlerta).toHaveBeenCalledWith('¡Tu solicitud ha sido registrada correctamente!');
    expect(inputNombre.value).toBe('');
    
    mockAlerta.mockRestore();
  });
});