 
import request from './http/httpApiProductos';

export const crearProductoAsync = async (data) => {
  try {
    const response = await request.post(`/producto`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
    return response
  } catch (error) {
 
    throw error
  }
} 

export const listarProductosAsync = async (data) => {
  try {
    const response = await request.get(`/producto`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
    return response
  } catch (error) {
 
    throw error
  }
} 
