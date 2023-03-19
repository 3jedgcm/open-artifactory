import {
    Button,
    Card,
    CardBody,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaDownload, FaInfoCircle, FaLink, FaPen, FaSync, FaTrash } from 'react-icons/fa'
import moment from 'moment'
import QRCode from 'react-qr-code'

const BASE_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : '/api/v1'

const getMb = (size) => (size / 1000000).toFixed(2)

export default function ArtifactItem({
  comment,
  authorization,
  hash,
  size,
  name,
  url,
  mimeType = 'unknown',
  uuid,
  downloadCount,
  createdAt,
  onUpdate = () => {
  }
}) {

  const [edit, setEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [information, setInformation] = useState(false)

  const toast = useToast()
  const date = moment(createdAt)
    .format('DD/MM/YYYY HH:mm:ss')

  const changeUuid = async (name) => {
    setLoading(true)
    let result = await fetch(BASE_URL + '/files/' + uuid + '/change-uuid', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authorization
      },
      method: 'POST'
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
    } else {
      onUpdate()
    }
    setLoading(false)
  }

  const editName = async (pName) => {
    let result = await fetch(BASE_URL + '/files/' + uuid, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authorization
      },
      method: 'PUT',
      body: JSON.stringify({
        name: pName,
        comment: comment
      })
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
    } else {
      onUpdate()
    }
  }

  const editComment = async (pComment) => {
    let result = await fetch(BASE_URL + '/files/' + uuid, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authorization
      },
      method: 'PUT',
      body: JSON.stringify({
        comment: pComment,
        name: name
      })
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
    } else {
      onUpdate()
    }
  }

  const deleteFile = async () => {
    setLoading(true)
    let result = await fetch(BASE_URL + '/files/' + uuid, {
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
    } else {
      onUpdate()
      setEdit(false)
      toast({
        description: 'The file has been successfully deleted',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    }
    setLoading(false)
  }

  const copyLink = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigator.clipboard.writeText(url)
      toast({
        description: 'Copied link to clipboard',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    }, 300)
  }

  return (
    <>
      <Modal isOpen={information} onClose={() => setInformation(false)}>
        <ModalOverlay/>
        <ModalContent marginLeft={4} marginRight={4}>
          <ModalHeader>
            <Text fontSize="2xl" textAlign="center" fontWeight="bold"
                  color="blackAlpha.700">{'Informations'}</Text>
          </ModalHeader>
          <Divider/>
          <ModalCloseButton/>
          <ModalBody mt={2}>
            <Text fontSize="md" color="blackAlpha.700">{'Reference : ' + uuid}</Text>
            <Text fontSize="md" color="blackAlpha.700">{'Name : ' + name}</Text>
            <Text fontSize="md" color="blackAlpha.700">{'Hash : ' + hash}</Text>
            <Divider marginTop={2} marginBottom={2}/>
            <Text fontSize="md" color="blackAlpha.700">{'Created at : ' + date}</Text>
            <Text fontSize="md" color="blackAlpha.700">{'Mimetype : ' + mimeType}</Text>
            <Text fontSize="md" color="blackAlpha.700">{'Download time : ' + downloadCount}</Text>
            <Text fontSize="md" color="blackAlpha.700">{'Size : ' + getMb(size) + ' Mo'}</Text>
            <Divider marginTop={2} marginBottom={2}/>
            <Text fontSize="md" mb={4} color="blackAlpha.700">{comment}</Text>
          </ModalBody>
          <ModalFooter mb={4} justifyContent="center">
            <QRCode cursor="pointer" onClick={() => copyLink()} value={url} size={164}/>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={edit} onClose={() => setEdit(false)}>
        <ModalOverlay/>
        <ModalContent marginLeft={4} marginRight={4}>
          <ModalHeader>
            <Text fontSize="2xl" fontWeight="bold" color="blackAlpha.700">{'Edit'}</Text>
          </ModalHeader>
          <ModalCloseButton/>
          <Divider/>
          <ModalBody mt={2}>
            <FormControl>
              <FormLabel fontWeight="bold" color="blackAlpha.700">Reference</FormLabel>
              <HStack>
                <Input borderWidth={2} fontWeight="bold" color="blackAlpha.800"
                       errorBorderColor="red.500" disabled value={uuid}/>
                <Button isLoading={loading} size="md" onClick={() => changeUuid()}>
                  <FaSync color="var(--chakra-colors-blackAlpha-700)"/>
                </Button>
              </HStack>
            </FormControl>
            <FormControl mt={2}>
              <FormLabel fontWeight="bold" color="blackAlpha.700">Name</FormLabel>
              <HStack>
                <Input borderWidth={2} fontWeight="bold" color="blackAlpha.800"
                       errorBorderColor="red.500" defaultValue={name} onChange={(event) => {
                  editName(event.currentTarget.value)
                }}/>
              </HStack>
            </FormControl>
            <FormControl mt={2}>
              <FormLabel fontWeight="bold" color="blackAlpha.700">Comment</FormLabel>
              <HStack>
                <Input borderWidth={2} fontWeight="bold" color="blackAlpha.800"
                       errorBorderColor="red.500" defaultValue={comment} onChange={(event) => {
                  editComment(event.currentTarget.value)
                }}/>
              </HStack>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button ml={2} size="sm" onClick={() => deleteFile()}
                    _hover={{ backgroundColor: 'red.700' }} backgroundColor="red.500" color="white">
              <FaTrash/>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Card variant="outline" mt={1}>
        <CardBody p={1}>
          <Flex paddingLeft={1} paddingRight={1}>
            <HStack flex={4} color="blue.900" alignSelf="center">
              <Text fontSize="md" max fontWeight="bold"
                    color="blackAlpha.700">{name.slice(0, 40)}</Text>
            </HStack>
            <HStack display={{
              base: 'none',
              sm: 'none',
              md: 'initial'
            }} flex={1} justifyContent="center" alignSelf="center">
              <Text fontSize="md" fontWeight="bold"
                    color="blackAlpha.700">{getMb(size) + ' Mo'}</Text>
            </HStack>
            <HStack display={{
              base: 'none',
              sm: 'none',
              md: 'initial'
            }} flex={1} align="center" justifyContent="center" alignSelf="center">
              <Text fontSize="md" fontWeight="bold" color="blackAlpha.700"
                    textAlign={'center'}>{downloadCount}</Text>
            </HStack>
            <HStack flex={2} justifyContent="end" alignSelf="center">
              <Button display={{
                base: 'none',
                sm: 'none',
                md: 'initial'
              }} size="sm" onClick={() => {
                window.open(url, '_blank')
                setTimeout(() => onUpdate(), 1000)
              }}>
                <FaDownload color="var(--chakra-colors-blackAlpha-700)"/>
              </Button>
              <Button size="sm" onClick={() => copyLink()}>
                <FaLink color="var(--chakra-colors-blackAlpha-700)"/>
              </Button>
              <Button size="sm" onClick={() => setEdit(true)}>
                <FaPen color="var(--chakra-colors-blackAlpha-700)"/>
              </Button>
              <Button size="sm" onClick={() => setInformation(true)}>
                <FaInfoCircle color="var(--chakra-colors-blackAlpha-700)"/>
              </Button>
            </HStack>
          </Flex>
        </CardBody>
      </Card>
    </>
  )
}
