import axios from 'axios'

export const getMantenciones = async (usuarioAuthId) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mantenciones`,
      { headers: { 'Authenticated-User': usuarioAuthId } }
    )
  
    return res.data
  } catch (error) {
    const newError = new Error(error.response.statusText)
    newError.status = error.response.status

    throw newError
  }
}

export const getMantencionById = async (usuarioAuthId, id) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mantencion/${id}`,
      { headers: { 'Authenticated-User': usuarioAuthId } }
    )
  
    return res.data
  } catch (error) {
    const newError = new Error(error.response.statusText)
    newError.status = error.response.status

    throw newError
  }
}

export const createMantencion = async (usuarioAuthId, mantencion) => {
  try {
    let form_data = new FormData()
    for (let key in mantencion) {
      if (mantencion[key]) {
        form_data.append(key, mantencion[key])
      }
    }
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mantencion`,
      form_data,
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

export const updateMantencionById = async (usuarioAuthId, mantencion) => {
  try {
    let form_data = new FormData()
    for (let key in mantencion) {
      if (mantencion[key] !== undefined && key !== '_id') {
        form_data.append(key, mantencion[key])
      }
    }
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mantencion/${mantencion._id}`,
      form_data,
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

export const deleteMantencionById = async (usuarioAuthId, id) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mantencion/${id}`,
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
