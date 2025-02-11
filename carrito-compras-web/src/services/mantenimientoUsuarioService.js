 
import request from './http/httpApiProductos';

export const crearUsuario = async (data) => {
  try {
    const response = await request.post(`/mantenimiento`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
    return response
  } catch (error) {
 
    throw error
  }
} 
 

