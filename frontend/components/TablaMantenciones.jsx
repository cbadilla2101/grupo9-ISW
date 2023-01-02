import { useState } from 'react'
import NextLink from 'next/link'
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
  useToast,
} from '@chakra-ui/react'
import { ViewIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { deleteMantencionById } from '../services/mantenciones'

export default function TablaMantenciones({ usuario, mantenciones }) {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [mantEliminar, setMantEliminar] = useState({})

  const handleDelete = async () => {
    try {
      await deleteMantencionById(usuario._id, mantEliminar._id)

      toast({
        title: 'Mantención eliminada correctamente.',
        status: 'success',
        isClosable: true,
      })
      onClose()
    } catch (_error) {
      toast({
        title: 'Error al eliminar mantención. Intentelo más tarde.',
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
              <Th>Descripción</Th>
              <Th>Estado</Th>
              <Th>Empresa</Th>
              <Th isNumeric>Costo</Th>
              <Th>Opciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mantenciones.map(mantencion => (
              <Tr key={mantencion._id}>
                <Td>{mantencion.descripcion}</Td>
                <Td>{mantencion.estado.toUpperCase()}</Td>
                <Td>{mantencion.empresa}</Td>
                <Td isNumeric>{mantencion.costo}</Td>
                <Td>
                  <HStack>
                    <NextLink href={`./mantencion/${mantencion._id}`}>
                      <Button leftIcon={<ViewIcon />} colorScheme="blue">Ver</Button>
                    </NextLink>
                    {usuario && usuario.rol === 'administrador' && (
                      <>
                        <NextLink href={`./mantencion/editar/${mantencion._id}`}>
                          <Button leftIcon={<EditIcon />} colorScheme="blue">Editar</Button>
                        </NextLink>
                        <Button leftIcon={<DeleteIcon />} colorScheme="red" onClick={() => {
                          setMantEliminar(mantencion)
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
          <ModalHeader>Eliminar Registro con ID: {mantEliminar._id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            ¿Está seguro(a) que desea eliminar el registro "{mantEliminar.descripcion}"?
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
