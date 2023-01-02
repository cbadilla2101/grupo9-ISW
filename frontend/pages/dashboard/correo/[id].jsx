import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Flex,
  Heading,
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
import Layout from '../../../components/Layout'
import { getCorreoById } from '../../../services/correos'
import { deleteCorreoById } from '../../../services/correos'

export default function CorreoPage() {
  const router = useRouter()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [correo, setCorreo] = useState({})
  const [usuario, setUsuario] = useState({})
  const [cargando, setCargando] = useState(true)

  const handleDelete = async () => {
    try {
      await deleteCorreoById(usuario._id, correo._id)

      onClose()
      toast({
        title: 'Correo eliminado correctamente.',
        status: 'success',
        isClosable: true,
      })
      router.push('/dashboard/correos')
    } catch (_error) {
      toast({
        title: 'Error al eliminar Correo. Intentelo más tarde.',
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
      getCorreoById(usuarioAuth._id, id)
        .then(correo => setCorreo(correo))
        .finally(() => setCargando(false))
        .catch((_error) => {
          toast({
            title: 'Error al obtener los datos. Intentelo más tarde.',
            status: 'error',
            isClosable: true,
          })
          router.push('/dashboard/correos')
        })
    }
  }, [router.isReady])

  return (
    <Layout title={cargando ? 'Correo' : `Correo ${correo.asunto}`}>
      <Flex mb="10">
        <Heading>{cargando ? 'Correo :' : ` ${correo.asunto}`}</Heading>
        <Spacer />
        {!cargando && usuario.rol === 'administrador' && (
          <>
            
            <Button colorScheme="red" ml="4" onClick={onOpen}>
              Eliminar Correo
            </Button>
          </>
        )}
      </Flex>
      {cargando && <Text>Cargando ...</Text>}
      {!cargando && (
        
          <SimpleGrid columns={[1, 2]} spacing="10">
            <Box>
              <Heading size="md">Asunto</Heading>
              <Text mb="4">{correo.asunto}</Text>
              <Heading size="md">Fecha</Heading>
              <Text mb="4">{correo.createdAt}</Text>
              <Heading size="md">Destinatarios</Heading>
              <Text mb="4">{correo.userEmails}</Text>
              <Heading size="md">descripcion</Heading>
              <Text mb="4">{correo.descripcion}</Text>            
            </Box>
            
          </SimpleGrid>
          
      
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Eliminar Correo con ID: {!cargando && correo._id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            ¿Está seguro(a) que desea eliminar el registro "{!cargando && correo.descripcion}"?
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
