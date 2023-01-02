import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  Spacer,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import Layout from '../../../components/Layout'
import { getMantencionById } from '../../../services/mantenciones'
import { deleteMantencionById } from '../../../services/mantenciones'

export default function MantencionPage() {
  const router = useRouter()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [mantencion, setMantencion] = useState({})
  const [usuario, setUsuario] = useState({})
  const [cargando, setCargando] = useState(true)

  const handleDelete = async () => {
    try {
      await deleteMantencionById(usuario._id, mantencion._id)

      onClose()
      toast({
        title: 'Mantención eliminada correctamente.',
        status: 'success',
        isClosable: true,
      })
      router.push('/dashboard/mantenciones')
    } catch (_error) {
      toast({
        title: 'Error al eliminar mantención. Intentelo más tarde.',
        status: 'error',
        isClosable: true,
      })
      onClose()
    }
  }

  useEffect(() => {
    const usuarioAuth = JSON.parse(localStorage.getItem('usuarioAuth'))

    if (router.isReady && usuarioAuth) {
      const { id } = router.query

      setUsuario(usuarioAuth)
      getMantencionById(usuarioAuth._id, id)
        .then(mantencion => setMantencion(mantencion))
        .finally(() => setCargando(false))
        .catch((_error) => {
          toast({
            title: 'Error al obtener los datos. Intentelo más tarde.',
            status: 'error',
            isClosable: true,
          })
          router.push('/dashboard/mantenciones')
        })
    }
  }, [router.isReady])

  return (
    <Layout title={cargando ? 'Mantencion' : `Mantencion ${mantencion.instalacion}`}>
      <Flex mb="10">
        <Heading>{cargando ? 'Mantencion' : `Mant. ID: ${mantencion._id}`}</Heading>
        <Spacer />
        {!cargando && usuario.rol === 'administrador' && (
          <>
            <NextLink href={`/dashboard/mantencion/editar/${mantencion._id}`}>
              <Button leftIcon={<EditIcon />} colorScheme="blue">
                Editar Registro
              </Button>
            </NextLink>
            <Button leftIcon={<DeleteIcon />} colorScheme="red" ml="4" onClick={onOpen}>
              Eliminar Registro
            </Button>
          </>
        )}
      </Flex>
      {cargando && <Text>Cargando ...</Text>}
      {!cargando && (
        <>
          <SimpleGrid columns={[1, 2]} spacing="10">
            <Box>
              <Heading size="md">Descripción</Heading>
              <Text mb="4">{mantencion.descripcion}</Text>
              <Heading size="md">Instalación</Heading>
              <Text mb="4">{mantencion.instalacion}</Text>
              <Heading size="md">Empresa</Heading>
              <Text mb="4">{mantencion.empresa}</Text>
              <Heading size="md">Costo</Heading>
              <Text mb="4">{mantencion.costo}</Text>
            </Box>
            <Box>
              <Heading size="md">Estado</Heading>
              <Text mb="4">{mantencion.estado.toUpperCase()}</Text>
              <Heading size="md">Fecha Inicio</Heading>
              <Text mb="4">{(new Date(mantencion.fecha_inicio)).toLocaleString('es')}</Text>
              <Heading size="md">Fecha Término</Heading>
              <Text mb="4">{(new Date(mantencion.fecha_termino)).toLocaleString('es')}</Text>
              <Heading size="md">Es Rutinaria</Heading>
              <Text mb="4">{mantencion.rutinaria ? 'SÍ' : 'NO'}</Text>
            </Box>
          </SimpleGrid>
          <SimpleGrid columns={[1, null, 2]} spacing="10" my="6" align="center">
            <Box>
              <Heading size="md">Imagen Antes</Heading>
              <Image
                src={
                  mantencion.imagen_antes ?
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/${mantencion.imagen_antes}` : '#'
                }
                alt='Imagen Antes' />
            </Box>
            <Box>
              <Heading size="md">Imagen Después</Heading>
              <Image
                src={
                  mantencion.imagen_despues ?
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/${mantencion.imagen_despues}` : '#'
                }
                alt='Imagen Después' />
            </Box>
          </SimpleGrid>
        </>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Eliminar Registro con ID: {!cargando && mantencion._id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            ¿Está seguro(a) que desea eliminar el registro "{!cargando && mantencion.descripcion}"?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr="3" onClick={handleDelete}>
              Eliminar
            </Button>
            <Button colorScheme="blue" mr="3" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  )
}
