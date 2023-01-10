import { useState } from 'react'
import NextLink from 'next/link'
import { deleteCorreoById } from '../services/correos'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast
} from '@chakra-ui/react'
import { ViewIcon, DeleteIcon } from '@chakra-ui/icons'

export default function TablaCorreos({ usuario, correos }) {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [corrEliminar, setCorrEliminar] = useState({})

  const handleDelete = async () => {
    try {
      await deleteCorreoById(usuario._id, corrEliminar._id)

      toast({
        title: 'Correo eliminado correctamente.',
        status: 'success',
        isClosable: true,
      })
      onClose()
    } catch (_error) {
      toast({
        title: 'Error al eliminar Correo. Intentelo más tarde.',
        status: 'error',
        isClosable: true,
      })
      onClose()
    }
  }

  return (
    <>
      <TableContainer>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th>Asunto</Th>
              <Th>Mantenciones</Th>
              <Th>Fecha</Th>
              <Th>Hora</Th>
              <Th>Opciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {correos.map(correo => (
              <Tr key={correo._id}>
                <Td>{correo.asunto}</Td>
                <Td>{correo.mantencion.map(mantencion => (
                  <div key={mantencion._id}>
                    {'[' + mantencion.descripcion + ']'}<br />
                  </div>
                ))}</Td>
                <Td>{(new Date(correo.createdAt)).toLocaleDateString('es')}</Td>
                <Td>{(new Date(correo.createdAt)).toLocaleTimeString('es')}</Td>
                <Td>
                
                  <HStack>
                    <NextLink href={`./correo/${correo._id}`}>
                      <Button leftIcon={<ViewIcon />} colorScheme="blue">Ver</Button>
                    </NextLink>
                    {usuario.rol === 'administrador' && (
                      <>
                        <Button leftIcon={<DeleteIcon />} colorScheme="red" onClick={() => {
                          setCorrEliminar(correo)
                          onOpen()
                        }}>
                          Eliminar
                        </Button>
                      </>
                    )}
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Eliminar Correo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            ¿Está seguro(a) que desea eliminar el correo "{corrEliminar.asunto}"?
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
    </>
  )
}