import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import { Button, Flex, Heading, Spacer, Text, useToast } from '@chakra-ui/react'
import Layout from '../../components/Layout'
import { getMantenciones } from '../../services/mantenciones'
import TablaMantenciones from '../../components/TablaMantenciones'

export default function MantencionesPage() {
  const toast = useToast()
  const [mantenciones, setMantenciones] = useState([])
  const [usuario, setUsuario] = useState({})
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const usuarioAuth = JSON.parse(localStorage.getItem('usuarioAuth'))
    if (usuarioAuth) {
      setUsuario(usuarioAuth)
      getMantenciones(usuarioAuth._id)
        .then(mantenciones => setMantenciones(mantenciones))
        .finally(() => setCargando(false))
        .catch((_error) => (
          toast({
            title: 'Error al obtener los datos. Intentelo más tarde.',
            status: 'error',
            isClosable: true,
          })
        ))
    }
  }, [mantenciones])

  return (
    <Layout title="Reg. de Mantenciones">
      <Flex mb="10">
        <Heading>Registros de Mantenciones</Heading>
        <Spacer />
        {usuario && usuario.rol === 'administrador' && (
          <NextLink href={'/dashboard/mantencion/crear'}>
            <Button colorScheme="blue">
              Crear Registro
            </Button>
          </NextLink>
        )}
      </Flex>
      {cargando && <Text>Cargando ...</Text>}
      {!cargando && (
        <TablaMantenciones
          usuario={usuario}
          mantenciones={mantenciones}
        />
      )}
    </Layout>
  )
}
