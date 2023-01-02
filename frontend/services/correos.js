import axios from 'axios'

export const getCorreos = async (usuarioAuthId) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/correos`,
      { headers: { 'Authenticated-User': usuarioAuthId } }
    )

    return res.data
  } catch (error) {
    const newError = new Error(error.response.statusText)
    newError.status = error.response.status

    throw newError
  }
}

export const getCorreoById = async (usuarioAuthId, id) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/correo/${id}`,
      { headers: { 'Authenticated-User': usuarioAuthId } }
    )

    return res.data
  } catch (error) {
    const newError = new Error(error.response.statusText)
    newError.status = error.response.status

    throw newError
  }
}

export const createCorreo = async (usuarioAuthId, correo) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/correo`,
      correo,
      { headers: { 'Authenticated-User': usuarioAuthId } }
    )

    return res.data
  } catch (error) {
    console.log(error)
    const newError = new Error(error.response.statusText)
    newError.status = error.response.status

    throw newError
  }
}

export const deleteCorreoById = async (usuarioAuthId, id) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/correo/${id}`,
      { headers: { 'Authenticated-User': usuarioAuthId } }
    )

    return res.data
  } catch (error) {
    console.log(error)
    const newError = new Error(error.response.statusText)
    newError.status = error.response.status

    throw newError
  }
}




