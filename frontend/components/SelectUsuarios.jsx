import { useState, useEffect } from 'react'
import { Select } from '@chakra-ui/react'
import { getUsuariosAlt } from '../services/usuarios'

const useUsuariosAlt = () => {
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    getUsuariosAlt()
      .then(usuarios => setUsuarios(usuarios))
      .finally(() => setCargando(false))
  }, [])

  return { usuarios, cargando }
}

export default function SelectUsuarios(props) {
  const { usuarios, cargando } = useUsuariosAlt()

  return (
    <Select
      placeholder={cargando ? 'Cargando usuarios ...' : 'Selecciona un usuario'}
      {...props}>
      {!cargando && (
          usuarios.map(usuario => (
            <option key={usuario._id} value={usuario._id}>
              {usuario.nombre + ' - ' + usuario.rol}
            </option>
          ))
      )}
    </Select>
  )
}
