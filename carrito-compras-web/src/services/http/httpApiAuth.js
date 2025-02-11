/* eslint-disable no-debugger */
/* eslint-disable no-underscore-dangle */
import axios from 'axios' 

const http = axios.create({
  baseURL: window.REACT_APP_AUTH 
})

// const { store } = configureStore()

http.interceptors.response.use(undefined, (error) => {
  if (error.message === 'Network Error' && !error.response) { 
    const error1 = {message: 'El sistema no response comunicarse con sistemas', status: 500}
    throw error1
  }

  // eslint-disable-next-line no-debugger
  // debugger
  const { status } = error.response
  if (status === 404) {
    throw error.response
  }

  if (status === 401) {
    throw error
  }

  if (status === 403) {
    // debugger
    // store.dispatch(logout())
    // throw error
    throw error
  }

  if (status === 500) {
    // toast.error('Server error')
    throw error
  }

  throw error.response
})

const responseBody = (response) => response.data

const request = {
  get: (url, body) => http.get(url, { params: body }).then(responseBody),
  post: (url, body, config) => http.post(url, body, config).then(responseBody),
  put: (url, body) => http.put(url, body).then(responseBody),
  delete: (url, body) => http.delete(url, body).then(responseBody),
  getDownload: (url, body, config) => http.get(url, { params: body, responseType: 'blob' }, config).then(responseBody),
  postDownload: (url, body, config) => http.post(url,body,{responseType: 'blob' }, config).then(responseBody),
  postDownload2: (url, body, config) => http.post(url, body, config).then(responseBody),
  postDownload3: (url, body, config) => http.post(url, body, config).then((res) => ({
    body: res.data,
    headers: res.headers
  })),
}

 
export default request