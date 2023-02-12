import { Button, Card, CardBody, CardFooter, CardHeader, Container, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, Link, Spinner, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { FaDocker, FaGithub } from 'react-icons/fa'
import List from './List'

const BASE_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : ""
export default function Authentication() {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [token, setToken] = useState("")

  const [code, setCode] = useState("")

  const getAuth = async (code) => {
    try {
      setError(false)
      if (code.length == 6) {
        setLoading(true)
        let result = await fetch(BASE_URL + "/login", {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            otpToken: code
          })
        })

        let resultJSON = await result.json()

        if (resultJSON.error) {
          setCode("")
          setError(true)
          setLoading(false)
        } else {
          setToken(resultJSON.jwtToken)
          setLoading(false)
          setCode("")
        }
      }
    } catch (error) {
      setError(true)
      setLoading(false)
      setCode("")
    }
  }


  if (token.length > 0) {
    return <List authorization={token} onDisconnect={() => { setToken("") }} />
  }
  return (
    <Container >
      <Card  >
        <CardHeader>
          <Heading textAlign='center' fontWeight='bold' color='blackAlpha.700'>Open Artifactory</Heading>
          <Text textAlign='center' fontWeight='bold' color='blackAlpha.700' mt={1} >Open source artifactory service</Text>
        </CardHeader>
        <CardBody>
          <FormControl isInvalid={error} mt='4' >
            <FormLabel fontWeight='bold' color='blackAlpha.700'>Enter your OTP password :</FormLabel>
            <HStack>
              <Input borderWidth={2} fontWeight='bold' color='blackAlpha.800' errorBorderColor='red.500' placeholder='000000' disabled={loading} value={code} maxLength={6} onChange={(event) => { setCode(event.currentTarget.value); getAuth(event.currentTarget.value) }} />
              <Spinner thickness='3px' color='blackAlpha.800' visibility={loading ? 'initial' : 'hidden'} />
            </HStack>
            <FormErrorMessage fontWeight='bold' color='red.500'>Invalid OTP</FormErrorMessage>
          </FormControl>
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


            */