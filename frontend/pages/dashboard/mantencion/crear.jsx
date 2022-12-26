import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Heading,
  SimpleGrid,
  FormControl,
  useToast,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  RadioGroup,
  Radio,
  HStack,
  Button,
} from '@chakra-ui/react'
import Layout from '../../../components/Layout'
import InputFile from '../../../components/InputFile'
import { createMantencion } from '../../../services/mantenciones'

export default function MantencionPage() {
  const router = useRouter()
  const toast = useToast()
  const [mantencion, setMantencion] = useState({
    descripcion: '',
    instalacion: '',
    fecha_inicio: undefined,
    fecha_termino: undefined,
    imagen_antes: undefined,
    imagen_despues: undefined,
    empresa: '',
    costo: undefined,
    rutinaria: 'no',
    estado: 'pendiente'
  })

  const handleChange = e => {
    setMantencion({
      ...mantencion,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const usuarioAuth = JSON.parse(localStorage.getItem('usuarioAuth'))

      await createMantencion(usuarioAuth._id, mantencion)

      toast({
        title: 'Mantención creada correctamente.',
        status: 'success',
        isClosable: true,
      })

      router.push('/dashboard/mantenciones')
    } catch (_error) {
      toast({
        title: 'Error al crear mantención. Intentelo más tarde.',
        status: 'error',
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    const usuarioAuth = JSON.parse(localStorage.getItem('usuarioAuth'))

    if (usuarioAuth && (usuarioAuth.rol !== 'administrador'))
      router.push('/dashboard/mantenciones')
  }, [])

  return (
    <Layout title="Crear Mantención">
      <Heading mb="10">Crear Registro de Mantención</Heading>
      <form onSubmit={handleSubmit}>
        <SimpleGrid columns={[1, 2]} spacing="10">
          <Box>
            <FormControl mb="4" isRequired>
              <FormLabel>Descripción</FormLabel>
              <Input
                type="text"
                name="descripcion"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb="4" isRequired>
              <FormLabel>Instalación</FormLabel>
              <Input
                type="text"
                name="instalacion"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb="4" isRequired>
              <FormLabel>Empresa</FormLabel>
              <Input
                type="text"
                name="empresa"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb="4" isRequired>
              <FormLabel>Costo</FormLabel>
              <NumberInput
                name="costo"
                min="0"
                onChange={(_, value) => {
                  handleChange({ target: { name: 'costo', value } })
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Box>
          <Box>
            <FormControl mb="4" isRequired>
              <FormLabel>Estado</FormLabel>
              <RadioGroup name="estado" defaultValue="pendiente" onChange={value => {
                handleChange({ target: { name: 'estado', value } })
              }}>
                <HStack spacing="24px">
                  <Radio value="pendiente">Pendiente</Radio>
                  <Radio value="en proceso">En proceso</Radio>
                  <Radio value="finalizado">Finalizado</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <FormControl mb="4" isRequired>
              <FormLabel>Fecha Inicio</FormLabel>
              <Input
                type="datetime-local"
                placeholder="Fecha Inicio"
                name="fecha_inicio"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Fecha Término</FormLabel>
              <Input
                type="datetime-local"
                placeholder="Fecha Término"
                name="fecha_termino"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb="4" isRequired>
              <FormLabel>Es Rutinaria</FormLabel>
              <RadioGroup name="rutinaria" defaultValue="no" onChange={value => {
                handleChange({ target: { name: 'rutinaria', value: (value === 'si') } })
              }}>
                <HStack spacing="24px">
                  <Radio value="si">SÍ</Radio>
                  <Radio value="no">NO</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </Box>
        </SimpleGrid>
        <SimpleGrid columns={[1, 2]} spacing="10" my="6" align="center">
          <Box>
            <FormControl mb="4">
              <FormLabel>Imagen Antes</FormLabel>
              <InputFile
                name="imagen_antes"
                accept="image/*"
                onChange={handleChange}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl mb="4">
              <FormLabel>Imagen Después</FormLabel>
              <InputFile
                name="imagen_despues"
                accept="image/*"
                onChange={handleChange}
              />
            </FormControl>
          </Box>
        </SimpleGrid>
        <Button type="submit" colorScheme="blue">
          Guardar
        </Button>
      </form>
    </Layout>
  )
}
