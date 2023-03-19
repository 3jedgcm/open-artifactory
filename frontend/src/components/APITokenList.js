import {
  Button,
  Divider,
  Flex,
  FormControl,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaCopy, FaPlus, FaTrash } from 'react-icons/fa'

const BASE_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : '/api/v1'

export default function APITokenList({
  show,
  setShow,
  authorization,
  onDisconnect
}) {

  const toast = useToast()

  const [currentToken, setCurrentToken] = useState('')
  const [currentName, setCurrentName] = useState('')
  const [tokens, setTokens] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (show) {
      getAllToken()
    }
  }, [show])

  const getAllToken = async () => {
    try {
      setLoading(true)
      let result = await fetch(BASE_URL + '/tokens', {
        headers: {
          Authorization: 'Bearer ' + authorization
        }
      })
      let resultJSON = await result.json()
      if (resultJSON.error) {
        if (resultJSON.httpCode == 401) {
          onDisconnect()
        }
        setLoading(false)
        setTokens([])
        toast({
          title: resultJSON.httpCode + ' ' + resultJSON.message,
          description: 'Please retry later',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      } else {
        setTokens(resultJSON.apiTokens)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      setTokens([])
      toast({
        title: 'Internal error server',
        description: 'Please retry later',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  const createToken = async () => {
    try {
      let result = await fetch(BASE_URL + '/tokens', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + authorization
        },
        method: 'POST',
        body: JSON.stringify({
          name: currentName
        })
      })
      let resultJSON = await result.json()
      if (resultJSON.error) {
        if (resultJSON.httpCode == 401) {
          onDisconnect()
        }
        toast({
          title: resultJSON.httpCode + ' ' + resultJSON.message,
          description: 'Please retry later',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      } else {
        setCurrentToken(resultJSON.bearerToken)
        setCurrentName('')
      }
    } catch (error) {
      setLoading(false)
      setTokens([])
      toast({
        title: 'Internal error server',
        description: 'Please retry later',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  const deleteToken = async (id) => {
    setLoading(true)
    let result = await fetch(BASE_URL + '/tokens/' + id, {
      headers: {
        Authorization: 'Bearer ' + authorization
      },
      method: 'DELETE'
    })
    let resultJSON = await result.json()
    if (resultJSON.error) {
      toast({
        title: resultJSON.httpCode + ' ' + resultJSON.message,
        description: 'Please retry later',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
      setLoading(false)
    } else {
      getAllToken()
    }
  }

  const copyToken = () => {
    navigator.clipboard.writeText(currentToken)
    toast({
      description: 'Copied token to clipboard',
      status: 'success',
      duration: 2000,
      isClosable: true
    })
  }

  return (
    <Modal isOpen={show} onClose={() => {
      setShow(false)
      setCurrentName('')
      setCurrentToken('')
    }}>
      <ModalOverlay/>
      <ModalContent marginLeft={4} marginRight={4}>
        <ModalHeader>
          <Text fontSize="2xl" textAlign="center" fontWeight="bold"
                color="blackAlpha.700">{'API key'}</Text>
        </ModalHeader>
        <Divider/>
        <ModalCloseButton/>
        <ModalBody mt={2}>
          {
            loading ?
              <Flex justifyContent={'center'} margin={4}>
                <Spinner size="sm"/>
              </Flex>
              :
              tokens.length == 0 ?
                <Text fontSize="md" textAlign="center" fontWeight="bold" color="blackAlpha.700">No
                  token found</Text>
                :
                tokens.map(token => {
                  return (
                    <HStack justifyContent="space-between" mt={1} mb={1}>
                      <VStack alignItems="start">
                        <Text fontSize="md" fontWeight="bold"
                              color={token.isValid ? 'blackAlpha.700' : 'blackAlpha.500'}>{token.name.slice(0, 42) + (token.isValid ? '' : ' ( expired )')}</Text>
                        <Text style={{
                          fontSize: 10,
                          marginTop: 0
                        }} fontWeight="bold"
                              color={'blackAlpha.500'}>{token.expireAt ? token.expireAt : 'Unlimited'}</Text>
                      </VStack>
                      <Button size="xs" onClick={() => deleteToken(token.id)}
                              _hover={{ backgroundColor: 'red.700' }} backgroundColor="red.500"
                              color="white">
                        <FaTrash/>
                      </Button>
                    </HStack>
                  )
                })
          }
        </ModalBody>
        <ModalFooter mt={6} mb={4} justifyContent="center">
          {
            currentToken.length == 0 ?
              <VStack width={'100%'}>
                <Divider mb={4}/>
                <HStack width={'100%'}>
                  <FormControl key="name">
                    <HStack>
                      <Input maxLength={30} id="current-name" placeholder="API key name"
                             borderWidth={2} fontWeight="bold" color="blackAlpha.800"
                             errorBorderColor="red.500" defaultValue={currentName}
                             onChange={(event) => {
                               setCurrentName(event.currentTarget.value)
                             }}/>
                    </HStack>
                  </FormControl>
                  <Button isDisabled={loading || currentName.length == 0} size="md" ml={2}
                          onClick={() => {
                            createToken()
                          }}>
                    <FaPlus color="var(--chakra-colors-blackAlpha-700)"/>
                  </Button>
                </HStack>
              </VStack>
              :
              <VStack>
                <Divider mb={4}/>
                <HStack>
                  <Button colorScheme="green" leftIcon={<FaCopy/>} isDisabled={loading} size="sm"
                          onClick={() => {
                            copyToken()
                            setCurrentToken('')
                            getAllToken()
                          }}>
                    <Text textAlign="center" fontWeight="bold">{'Copy API key'}</Text>
                  </Button>
                </HStack>
                <Text fontSize="small" textAlign="center" fontWeight="bold"
                      color="blackAlpha.700">{'Copy key and paste it somewhere, API key can\'t be recovered'}</Text>
              </VStack>
          }
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
