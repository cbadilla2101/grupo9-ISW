import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from '@chakra-ui/react'
import Layout from '../../../../components/Layout'
import InputFile from '../../../../components/InputFile'
import { updateMantencionById } from '../../../../services/mantenciones'
import { getMantencionById } from '../../../../services/mantenciones'
import { dateFormat } from '../../../../utils/dateFormat'

export default function MantencionPage() {
  const router = useRouter()
  const toast = useToast()
  const [mantencion, setMantencion] = useState({})
  const [cargando, setCargando] = useState(true)

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

      await updateMantencionById(usuarioAuth._id, mantencion)

      toast({
        title: 'Mantención editada correctamente.',
        status: 'success',
        isClosable: true,
      })

      router.push('/dashboard/mantenciones')
    } catch (_error) {
      toast({
        title: 'Error al editar mantención. Intentelo más tarde.',
        status: 'error',
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    const usuarioAuth = JSON.parse(localStorage.getItem('usuarioAuth'))

    if (router.isReady && usuarioAuth) {
      if (usuarioAuth.rol !== 'administrador') {
        router.push('/dashboard/mantenciones')
      } else {
        const { id } = router.query

        getMantencionById(usuarioAuth._id, id)
          .then(mantencion => setMantencion({
            _id: mantencion._id,
            descripcion: mantencion.descripcion,
            instalacion: mantencion.instalacion,
            fecha_inicio: dateFormat(mantencion.fecha_inicio),
            fecha_termino: dateFormat(mantencion.fecha_termino),
            imagen_antes: undefined,
            imagen_despues: undefined,
            imagen_antes_act: mantencion.imagen_antes,
            imagen_despues_act: mantencion.imagen_despues,
            empresa: mantencion.empresa,
            costo: mantencion.costo,
            rutinaria: mantencion.rutinaria ? 'si' : 'no',
            estado: mantencion.estado
          }))
          .finally(() => setCargando(false))
          .catch((_error) => {
            console.log(_error)
            toast({
              title: 'Error al obtener los datos. Intentelo más tarde.',
              status: 'error',
              isClosable: true,
            })
            router.push('/dashboard/mantenciones')
          })
      }
    }
  }, [router.isReady])

  return (
    <Layout title={cargando ? 'Editar Mant.' : `Editar Mant. ${mantencion.instalacion}`}>
      <Heading mb="10">{cargando ? 'Mantencion' : `Mant. ID: ${mantencion._id}`}</Heading>
      {cargando && <Text>Cargando ...</Text>}
      {!cargando && (
        <form onSubmit={handleSubmit}>
          <SimpleGrid columns={[1, 2]} spacing="10">
            <Box>
              <FormControl mb="4" isRequired>
                <FormLabel>Descripción</FormLabel>
                <Input
                  type="text"
                  name="descripcion"
                  value={mantencion.descripcion}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb="4" isRequired>
                <FormLabel>Instalación</FormLabel>
                <Input
                  type="text"
                  name="instalacion"
                  value={mantencion.instalacion}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb="4" isRequired>
                <FormLabel>Empresa</FormLabel>
                <Input
                  type="text"
                  name="empresa"
                  value={mantencion.empresa}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb="4" isRequired>
                <FormLabel>Costo</FormLabel>
                <NumberInput
                  name="costo"
                  value={mantencion.costo}
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
                <RadioGroup
                  name="estado"
                  value={mantencion.estado}
                  onChange={value => {
                    handleChange({ target: { name: 'estado', value } })
                  }}
                >
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
                  value={mantencion.fecha_inicio}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Fecha Término</FormLabel>
                <Input
                  type="datetime-local"
                  placeholder="Fecha Término"
                  name="fecha_termino"
                  value={mantencion.fecha_termino}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb="4" isRequired>
                <FormLabel>Es Rutinaria</FormLabel>
                <RadioGroup
                  name="rutinaria"
                  value={mantencion.rutinaria}
                  onChange={value => {
                    handleChange({ target: { name: 'rutinaria', value: (value === 'si') } })
                  }}
                >
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
                {mantencion.imagen_antes_act && (
                  <Button colorScheme="red" mt="4" onClick={() => {
                    setMantencion({
                      ...mantencion,
                      imagen_antes: null,
                      imagen_antes_act: null,
                    })
                  }}>
                    Borrar Imagen Actual
                  </Button>
                )}
                {(mantencion.imagen_antes || mantencion.imagen_antes_act) && (
                  <Image
                    src={
                      mantencion.imagen_antes ?
                        URL.createObjectURL(mantencion.imagen_antes) :
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${mantencion.imagen_antes_act}`
                    }
                    accept="image/*"
                    alt="Imagen Antes"
                    mt="4"
                  />
                )}
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
                {mantencion.imagen_despues_act && (
                  <Button colorScheme="red" mt="4" onClick={() => {
                    setMantencion({
                      ...mantencion,
                      imagen_despues: null,
                      imagen_despues_act: null,
                    })
                  }}>
                    Borrar Imagen Actual
                  </Button>
                )}
                {(mantencion.imagen_despues || mantencion.imagen_despues_act) && (
                  <Image
                    src={
                      mantencion.imagen_despues ?
                        URL.createObjectURL(mantencion.imagen_despues) :
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${mantencion.imagen_despues_act}`
                    }
                    accept="image/*"
                    alt="Imagen Después"
                    mt="4"
                  />
                )}
              </FormControl>
            </Box>
          </SimpleGrid>
          <Button type="submit" colorScheme="blue">
            Guardar
          </Button>
        </form>
      )}
    </Layout>
  )
}
