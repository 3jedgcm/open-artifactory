import { Button, Card, CardBody, CardFooter, CardHeader, Container, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, Link, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { FaDocker, FaGithub } from 'react-icons/fa'
import { encode } from 'base-64'
import List from './List'

const BASE_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : ""
export default function Authentication() {

  const [loading, setLoading] = useState(false)
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState(false)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  const getAuthBasic = async () => {
    setError(false)
    setLoading(true)
    let result = await fetch(BASE_URL + "/files", {
      headers: {
        Authorization: "Basic " + encode(login + ':' + password)
      }
    })
    let resultJSON = await result.json()
    if (resultJSON.error) {
      setError(true)
      setLoading(false)
      setLogin("")
      setPassword("")
    } else {
      setConnected(true)
      setLoading(false)
    }
  }

  if (connected) {
    return <List authorization={"Basic " + encode(login + ':' + password)} onDisconnect={() => { setConnected(false); setLogin(""); setPassword("") }} />
  }
  return (
    <Container >
      <Card  >
        <CardHeader>
          <Heading textAlign='center' fontWeight='bold' color='blackAlpha.700'>Open Artifactory</Heading>
          <Text textAlign='center' fontWeight='bold' color='blackAlpha.700' mt={1} >Open source artifactory service</Text>
        </CardHeader>
        <CardBody>
          <FormControl isInvalid={error}>
            <FormLabel fontWeight='bold' color='blackAlpha.700'>Enter your login :</FormLabel>
            <HStack>
              <Input id='login' borderWidth={2} fontWeight='bold' color='blackAlpha.800' errorBorderColor='red.500' placeholder='Login' disabled={loading} value={login} onChange={(event) => { setLogin(event.currentTarget.value) }} />
            </HStack>
          </FormControl>
          <FormControl isInvalid={error} mt='4' >
            <FormLabel fontWeight='bold' color='blackAlpha.700'>Enter your password :</FormLabel>
            <HStack>
              <Input id='password' borderWidth={2} fontWeight='bold' color='blackAlpha.800' errorBorderColor='red.500' placeholder='Password' disabled={loading} value={password} type='password' onChange={(event) => { setPassword(event.currentTarget.value) }} />
            </HStack>
            <FormErrorMessage fontWeight='bold' color='red.500'>Invalid login or password</FormErrorMessage>
          </FormControl>
          <Button isLoading={loading} size='sm' colorScheme='blackAlpha' mt='4' onClick={() => getAuthBasic()} >
            Login
          </Button>
        </CardBody>
        <CardFooter>
          <Link href="https://github.com/3jedgcm/open-artifactory">
            <Button>
              <FaGithub color='var(--chakra-colors-blackAlpha-800)' />
            </Button>
          </Link>
          <Link ml={3} href="https://hub.docker.com/repository/docker/3jedgcm/open-artifactory">
            <Button>
              <FaDocker color='var(--chakra-colors-blackAlpha-800)' />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </Container>
  )
}


/*
  const [code, setCode] = useState("")

const getAuth = (code) => {
    setError(false)
    if (code.length == 6) {
      setLoading(true)
      setTimeout(() => {
        if (code == "123456") {
          setConnected(true)
          setLoading(false)
        } else {
          setCode("")
          setError(true)
          setLoading(false)
        }
      }, 1000)
    }
  }

<HStack>
              <Input borderWidth={2} fontWeight='bold' color='blackAlpha.800' errorBorderColor='red.500' placeholder='000000' disabled={loading} value={code} maxLength={6} onChange={(event) => { setCode(event.currentTarget.value); getAuth(event.currentTarget.value) }} />
              <Spinner thickness='3px' color='blackAlpha.800' visibility={loading ? 'initial' : 'hidden'} />
            </HStack>
            */