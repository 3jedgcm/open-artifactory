import { Box, ChakraProvider } from '@chakra-ui/react'
import Authentication from './components/Authentication'

export default function App() {

  return (
    <ChakraProvider >
      <Box className='background' display='flex' alignContent='center' alignItems='center'>
        <Authentication />
      </Box>
    </ChakraProvider>
  )
}

