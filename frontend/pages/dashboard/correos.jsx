import { useState, useEffect } from 'react'
import { Heading, Text, useToast } from '@chakra-ui/react'
import Layout from '../../components/Layout'
import { getCorreos } from '../../services/correos'
import TablaCorreos from '../../components/TablaCorreos'

export default function CorreosPage() {
  const toast = useToast()
  const [correos, setCorreos] = useState([])
  const [usuario, setUsuario] = useState({})
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const usuarioAuth = JSON.parse(localStorage.getItem('usuarioAuth'))

    if (usuarioAuth) {
      setUsuario(usuarioAuth)
      getCorreos(usuarioAuth._id)
        .then(correos => setCorreos(correos))
        .finally(() => setCargando(false))
        .catch((_error) => (
          toast({
            title: 'Error al obtener los datos. Intentelo más tarde.',
            status: 'error',
            isClosable: true,
          })
        ))
    }
  }, [correos])

  return (
    <Layout title="Reg. de correos">
      <Heading mb="10">Registros de Notificaciones</Heading>
      {cargando && <Text>Cargando ...</Text>}
      {!cargando && (
        <TablaCorreos
          usuario={usuario}
          correos={correos}
        />
      )}
    </Layout>
  )
}