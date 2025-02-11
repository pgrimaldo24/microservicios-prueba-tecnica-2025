 
import request from './http/httpApiAuth';

export const auth = async (data) => {
  try {
    const response = await request.post(`/user`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
    return response
  } catch (error) {
 
    throw error
  }
} 
 

