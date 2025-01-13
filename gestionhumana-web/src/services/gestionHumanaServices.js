 
import request from './axios/httpApiRequerimiento'

export const crearRequerimientoServices = async (data) => {
  try {
    const response = await request.post(`/requerimiento`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
    return response
  } catch (error) {
 
    throw error
  }
} 


export const listarBandeja = async () => {
  try {
    const response = await request.get(`/requerimiento/bandeja`);
  
    return response
  } catch (error) {
 
    throw error
  }
} 

export const eliminarRegistro = async (id) => {
  try {
    const response = await request.delete(`/requerimiento/{id}?id=${id}`);
  
    return response
  } catch (error) {
 
    throw error
  }
} 

export const obtenerCandidato = async (id) => {
  try {
    const response = await request.get(`/requerimiento/{id}?id=${id}`);
  
    return response
  } catch (error) {
 
    throw error
  }
} 

export const actualizarRequerimiento = async (data) => {
  try {
    console.log("data", data);
   
    const formDataParams = new URLSearchParams();
    formDataParams.append('id', data.id);   
    formDataParams.append('apePaterno', data.apePaterno);
    formDataParams.append('apeMaterno', data.apeMaterno);
    formDataParams.append('nombres', data.nombres);
    formDataParams.append('email', data.email);
    formDataParams.append('numCel', data.numCel);
    formDataParams.append('direccion', data.direccion);
    formDataParams.append('puestoSolicitante', data.puestoSolicitante);
    formDataParams.append('activo', data.activo);
    formDataParams.append('fechaActualizacion', data.fechaActualizacion);

    const response = await request.put(`/requerimiento`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formDataParams.toString(),   
    });

    return response;
  } catch (error) {
    console.error("Error al actualizar requerimiento", error);
    throw error;
  }
};

