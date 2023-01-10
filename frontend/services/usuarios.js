import axios from 'axios'

export const getUsuariosAlt = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/usuarios-alt`
    )
  
    return res.data
  } catch (error) {
    const newError = new Error(error.response.statusText)
    newError.status = error.response.status

    throw newError
  }
}

export const getUsuarioById = async (usuarioAuthId, id) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/usuario/${id}`,
      { headers: { 'Authenticated-User': usuarioAuthId } }
    )
  
    return res.data
  } catch (error) {
    const newError = new Error(error.response.statusText)
    newError.status = error.response.status
    
    throw newError
  }
}
