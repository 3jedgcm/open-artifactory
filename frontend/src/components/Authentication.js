import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Spinner,
  Text
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaDocker, FaGithub } from 'react-icons/fa'
import List from './List'
import QRCode from 'react-qr-code'

const BASE_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : '/api/v1'

export default function Authentication() {

  const [loading, setLoading] = useState(true)
  const [otp, setOtp] = useState('')
  const [otpSecret, setOtpSecret] = useState('')
  const [error, setError] = useState(false)
  const [internalError, setInternalError] = useState(false)
  const [token, setToken] = useState('')

  const [code, setCode] = useState('')

  useEffect(() => {
    initialisation()
  }, [])

  const initialisation = async () => {
    try {
      let result = await fetch(BASE_URL + '/setup')
      let resultJSON = await result.json()
      if (resultJSON.error) {
        if (resultJSON.httpCode == 403) {
          setOtpSecret('')
          setOtp('')
        } else {
          setInternalError(true)
          return
        }
      } else {
        setOtpSecret(resultJSON.otpSecret)
        setOtp(resultJSON.otpUrl)
      }
    } catch (error) {
      setInternalError(true)
      return
    }
    setLoading(false)
  }

  const confirmCode = async (code) => {
    try {
      setError(false)
      if (code.length == 6) {
        setLoading(true)
        let result = await fetch(BASE_URL + '/setup', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            otpToken: code,
            otpSecret: otpSecret
          })
        })
        let resultJSON = await result.json()
        if (resultJSON.error) {
          setCode('')
          setError(true)
          setLoading(false)
        } else {
          setToken(resultJSON.jwtToken)
          setLoading(false)
          setCode('')
        }
      }
    } catch (error) {
      setInternalError(true)

    }
  }

  const getAuth = async (code) => {
    try {
      setError(false)
      if (code.length == 6) {
        setLoading(true)
        let result = await fetch(BASE_URL + '/login', {
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
          setCode('')
          setError(true)
          setLoading(false)
        } else {
          setOtp('')
          setOtpSecret('')
          setToken(resultJSON.jwtToken)
          setLoading(false)
          setCode('')
        }
      }
    } catch (error) {
      setError(true)
      setLoading(false)
      setCode('')
    }
  }

  if (token.length > 0) {
    return <List authorization={token} onDisconnect={() => {
      setToken('')
    }}/>
  }
  return (
    <Container>
      <Card>
        <CardHeader>
          <Heading textAlign="center" fontWeight="bold" color="blackAlpha.700">Open
            Artifactory</Heading>
          <Text textAlign="center" fontWeight="bold" color="blackAlpha.700" mt={1}>Open source
            artifactory service</Text>
        </CardHeader>
        {
          otp.length > 0 && otpSecret.length > 0 ?
            <CardBody>
              <Text textAlign="center" fontWeight="bold" color="blackAlpha.700" mt={1}>Add
                configuration to your favorite application</Text>
              <HStack justifyContent="center" marginTop={4}>
                <QRCode onClick={() => initialisation()} cursor="pointer" value={otp} size={198}/>
              </HStack>
              <FormControl isInvalid={error} mt="4">
                <FormLabel fontWeight="bold" color="blackAlpha.700">Confirm your one time password
                  :</FormLabel>
                <HStack>
                  <Input borderWidth={2} fontWeight="bold" color="blackAlpha.800"
                         errorBorderColor="red.500" placeholder="000000" disabled={loading}
                         value={code} maxLength={6} onChange={(event) => {
                    setCode(event.currentTarget.value)
                    confirmCode(event.currentTarget.value)
                  }}/>
                  <Spinner thickness="3px" color="blackAlpha.800"
                           visibility={loading ? 'initial' : 'hidden'}/>
                </HStack>
                <FormErrorMessage fontWeight="bold" color="red.500">Invalid code</FormErrorMessage>
              </FormControl>
              {
                internalError ?
                  <Text fontWeight="bold" marginTop={2} color="red.500">Internal error
                    server</Text> :
                  null
              }
            </CardBody>
            :
            <CardBody>
              <FormControl isInvalid={error} mt="4">
                <FormLabel fontWeight="bold" color="blackAlpha.700">Enter your one time password
                  code :</FormLabel>
                <HStack>
                  <Input borderWidth={2} fontWeight="bold" color="blackAlpha.800"
                         errorBorderColor="red.500" placeholder="000000" disabled={loading}
                         value={code} maxLength={6} onChange={(event) => {
                    setCode(event.currentTarget.value)
                    getAuth(event.currentTarget.value)
                  }}/>
                  <Spinner thickness="3px" color="blackAlpha.800"
                           visibility={loading ? 'initial' : 'hidden'}/>
                </HStack>
                <FormErrorMessage fontWeight="bold" color="red.500">Invalid code</FormErrorMessage>
              </FormControl>
              {
                internalError ?
                  <Text fontWeight="bold" marginTop={2} color="red.500">Internal error
                    server</Text> :
                  null
              }
            </CardBody>
        }
        <CardFooter>
          <Link href="https://github.com/3jedgcm/open-artifactory">
            <Button>
              <FaGithub color="var(--chakra-colors-blackAlpha-800)"/>
            </Button>
          </Link>
          <Link ml={3} href="https://hub.docker.com/repository/docker/3jedgcm/open-artifactory">
            <Button>
              <FaDocker color="var(--chakra-colors-blackAlpha-800)"/>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </Container>
  )
}
