import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import {
  Box,
  Button,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Stack,
  useToast,
} from '@chakra-ui/react'
import SelectUsuarios from '../components/SelectUsuarios'
import { getUsuarioById } from '../services/usuarios'

export default function LoginPage() {
  const router = useRouter()
  const toast = useToast()
  const [selectUsuario, setSelectUsuario] = useState('')

  const login = async () => {
    try {
      const usuario = await getUsuarioById(selectUsuario, selectUsuario)
      
      localStorage.setItem('usuarioAuth', JSON.stringify(usuario))
      
      router.push('/dashboard/mantenciones')
    } catch (error) {
      toast({
        title: 'No se pudo iniciar sesión.',
        description: "Se debe seleccionar un usuario.",
        status: 'error',
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    const usuarioAuth = JSON.parse(localStorage.getItem('usuarioAuth'))
    
    if (usuarioAuth) setSelectUsuario(usuarioAuth._id)
  }, [])

  return (
    <>
      <Head>
        <title>Inicio de Sesión - Mantención de Instalaciones</title>
        <meta name="description" content="App Mantención de Instalaciones" />
      </Head>
      <Flex minH="100vh" align="center" justify="center" bg="gray.50">
        <Stack spacing="8" mx="auto" minW="md" py="12" px="6">
          <Stack align="center">
            <Heading fontSize="4xl">Inicio de Sesión</Heading>
          </Stack>
          <Box rounded="lg" bg="white" boxShadow="lg" p="8">
            <Stack spacing="4">
              <FormControl id="usuario">
                <FormLabel>Usuario</FormLabel>
                <SelectUsuarios
                  value={selectUsuario}
                  onChange={e => setSelectUsuario(e.target.value)}
                />
              </FormControl>
              <Stack spacing="10">
                <Button colorScheme="blue" onClick={login}>
                  Iniciar
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  )
}