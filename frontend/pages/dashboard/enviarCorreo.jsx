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
  Button,
  Textarea,
} from '@chakra-ui/react'
import Select from 'react-select'
import Layout from '../../components/Layout'
import { createCorreo } from '../../services/correos'
import { getMantenciones } from '../../services/mantenciones'

export default function EnviarCorreoPage() {
  const router = useRouter()
  const toast = useToast()
  const [correo, setCorreo] = useState({
    mantencion: [],
    asunto: '',
    userEmails: [],
    descripcion: ''
  })
  const [options, setOptions] = useState([])

  const handleChange = e => {
    if (e.target.name === 'userEmails') {
      setCorreo({
        ...correo,
        userEmails: e.target.value.split(',')
      })
    } else {
      setCorreo({
        ...correo,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const usuarioAuth = JSON.parse(localStorage.getItem('usuarioAuth'))


      await createCorreo(usuarioAuth._id, correo)

      toast({
        title: 'Correo enviado correctamente.',
        status: 'success',
        isClosable: true,
      })

      router.push('/dashboard/correos')
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error al enviar correo. Intentelo más tarde.',
        status: 'error',
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    const usuarioAuth = JSON.parse(localStorage.getItem('usuarioAuth'))

    if (usuarioAuth) {
      if (usuarioAuth.rol !== 'administrador')
        return router.push('/dashboard/correos')

      getMantenciones(usuarioAuth._id)
        .then(mantenciones => setOptions(mantenciones.map(
          mant => ({ value: mant._id, label: mant.descripcion })
        )))
        .catch((_error) => (
          toast({
            title: 'Error al obtener los datos. Intentelo más tarde.',
            status: 'error',
            isClosable: true,
          })
        ))
    }
  }, [])

  return (
    <Layout title="Crear correo">
      <Heading mb="10">Enviar correo</Heading>
      <form onSubmit={handleSubmit}>
        <SimpleGrid columns={[1, 2]} spacing="10">
          <Box>
            <FormControl mb="4" isRequired>
              <FormLabel>Asunto</FormLabel>
              <Input
                type="text"
                name="asunto"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb="4" isRequired>
              <FormLabel>Hacia</FormLabel>
              <Input
                type="email"
                name="userEmails"
                multiple
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Mantenciones asociadas</FormLabel>
              <Select
                name="mantencion"
                options={options}
                onChange={value => handleChange(
                  { target: { name: 'mantencion', value: value.map(
                    option => option.value
                  ) } }
                )}
                isMulti
              />
            </FormControl>
            <FormControl mb="4" isRequired>
              <FormLabel>Descripción</FormLabel>
              <Textarea
                type="text"
                name="descripcion"
                onChange={handleChange}
                style={{ resize: 'horizontal', width: '600px', height: '150px', overflow: 'hidden' }}
              />
            </FormControl>
          </Box>
        </SimpleGrid>
        <Button type="submit" colorScheme="blue">
          Enviar
        </Button>
      </form>
    </Layout>
  )
}
