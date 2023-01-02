import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import NextLink from 'next/link'
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Link,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
  VStack,
  Text,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

const Links = [
  { name: 'Mantenciones', href: '/dashboard/mantenciones', permit: ['administrador', 'residente'] },
  { name: 'Correos', href: '/dashboard/correos', permit: ['administrador', 'residente'] },
  { name: 'Enviar Correo', href: '/dashboard/enviarCorreo', permit: ['administrador'] },
]

const NavLink = ({ children, href }) => (
  <Link
    as={NextLink}
    px="2"
    py="1"
    rounded="md"
    _hover={{
      textDecoration: 'none',
      bg: 'gray.800',
    }}
    href={href}>
    {children}
  </Link>
)

export default function Layout({ children, title }) {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [usuario, setUsuario] = useState({})
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const usuarioAuth = JSON.parse(localStorage.getItem('usuarioAuth'))
    if (!usuarioAuth) {
      router.push('/login')
    } else {
      setUsuario(usuarioAuth)
      setCargando(false)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('usuarioAuth')
    router.push('/login')
  }

  return (
    <>
      <Head>
        <title>{title ? `${title} - Mant. de Instalaciones` : 'Mant. de Instalaciones'}</title>
        <meta name="description" content="App Mantención de Instalaciones" />
      </Head>
      <Box bg="black" px="4">
        <Flex h="16" alignItems="center" justifyContent="space-between">
          <IconButton
            colorScheme="black"
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing="8" alignItems="center" color="white">
            <Box>ISW-G9 2022-2</Box>
            <HStack
              as="nav"
              spacing="4"
              display={{ base: 'none', md: 'flex' }}>
              {!cargando && Links.map((link) => (
                link.permit.some(rol => rol === usuario.rol) && (
                  <NavLink key={link.name} href={link.href}>{link.name}</NavLink>
                )
              ))}
            </HStack>
          </HStack>
          <Flex alignItems="center">
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW="0">
                <HStack color="gray.100">
                  <Avatar size="sm" bg="black" />
                  <VStack spacing="1px" ml="2" alignItems="flex-start">
                    <Text fontSize="sm">
                      {!cargando && usuario.nombre.toUpperCase()}
                    </Text>
                    <Text fontSize="xs">
                      {!cargando && usuario.rol[0].toUpperCase() + usuario.rol.slice(1)}
                    </Text>
                  </VStack>
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb="4" display={{ md: 'none' }}>
            <Stack as="nav" spacing="4" color="white">
              {Links.map((link) => (
                <NavLink key={link.name} href={link.href}>{link.name}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Container maxW="7xl" py="4">
        {children}
      </Container>
    </>
  )
}