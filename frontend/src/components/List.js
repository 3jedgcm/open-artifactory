import { Button, Card, CardBody, CardFooter, CardHeader, Container, Divider, Flex, FormControl, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Spinner, Text, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaDoorOpen, FaInfoCircle, FaLink, FaPen, FaSync, FaTrash, FaUndo } from 'react-icons/fa'
import moment from 'moment'
import { FaDownload } from 'react-icons/fa'
import QRCode from "react-qr-code"

const BASE_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : ""

const getMb = (size) => (size / 1000000).toFixed(2)
const getGo = (size) => (size / 1000000000).toFixed(2)

const Item = function ({ authorization, hash, size, name, url, mimeType = "unknown", uuid, downloadCount, createdAt, onUpdate = () => { } }) {


    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingInformation, setLoadingInformation] = useState(false)
    const [information, setInformation] = useState(false)

    const toast = useToast()
    const date = moment(createdAt).format("DD/MM/YYYY HH:mm:ss")

    const changeUuid = async (name) => {
        setLoading(true)
        let result = await fetch(BASE_URL + "/files/" + uuid + "/change-uuid", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + authorization
            },
            method: 'POST'
        })
        let resultJSON = await result.json()
        if (resultJSON.error) {
            toast({
                title: resultJSON.httpCode + " " + resultJSON.message,
                description: "Please retry later",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        } else {
            onUpdate()
        }
        setLoading(false)
    }

    const editName = async (name) => {
        let result = await fetch(BASE_URL + "/files/" + uuid, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + authorization
            },
            method: 'PUT',
            body: JSON.stringify({
                name: name
            })
        })
        let resultJSON = await result.json()
        if (resultJSON.error) {
            toast({
                title: resultJSON.httpCode + " " + resultJSON.message,
                description: "Please retry later",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        } else {
            onUpdate()
        }
    }

    const deleteFile = async () => {
        setLoading(true)
        let result = await fetch(BASE_URL + "/files/" + uuid, {
            headers: {
                Authorization: "Bearer " + authorization
            },
            method: 'DELETE'
        })
        let resultJSON = await result.json()
        if (resultJSON.error) {
            toast({
                title: resultJSON.httpCode + " " + resultJSON.message,
                description: "Please retry later",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        } else {
            onUpdate()
            setEdit(false)
            toast({
                description: "The file has been successfully deleted",
                status: 'success',
                duration: 2000,
                isClosable: true,
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
                description: "Copied link to clipboard",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
        }, 300)
    }


    return (
        <>
            <Modal isOpen={information} onClose={() => setInformation(false)}>
                <ModalOverlay />
                <ModalContent marginLeft={4} marginRight={4}>
                    <ModalHeader>
                        <Text fontSize='2xl' textAlign='center' fontWeight='bold' color='blackAlpha.700' >{"Informations"}</Text>
                    </ModalHeader>
                    <Divider />
                    <ModalCloseButton />
                    <ModalBody mt={2} >
                        <Text fontSize='md' color='blackAlpha.700' >{"Reference : " + uuid}</Text>
                        <Text fontSize='md' color='blackAlpha.700' >{"Name : " + name}</Text>
                        <Text fontSize='md' color='blackAlpha.700' >{"Hash : " + hash}</Text>
                        <Divider marginTop={2} marginBottom={2} />
                        <Text fontSize='md' color='blackAlpha.700' >{"Created at : " + date}</Text>
                        <Text fontSize='md' color='blackAlpha.700' >{"Mimetype : " + mimeType}</Text>
                        <Text fontSize='md' color='blackAlpha.700' >{"Download time : " + downloadCount}</Text>
                        <Text fontSize='md' color='blackAlpha.700' >{"Size : " + getMb(size) + " Mo"}</Text>
                        <Divider marginTop={2} marginBottom={2} />
                    </ModalBody>
                    <ModalFooter justifyContent='center' mb={4}>
                        <QRCode cursor='pointer' onClick={() => copyLink()} value={url}  size={164} />
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={edit} onClose={() => setEdit(false)}>
                <ModalOverlay />
                <ModalContent marginLeft={4} marginRight={4}>
                    <ModalHeader>
                        <Text fontSize='2xl' fontWeight='bold' color='blackAlpha.700' >{"Manage"}</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <Divider />
                    <ModalBody mt={2} >
                        <FormControl >
                            <FormLabel fontWeight='bold' color='blackAlpha.700'>Reference</FormLabel>
                            <HStack>
                                <Input borderWidth={2} fontWeight='bold' color='blackAlpha.800' errorBorderColor='red.500' disabled value={uuid} />
                                <Button isLoading={loading} size='md' onClick={() => changeUuid()}>
                                    <FaSync color='var(--chakra-colors-blackAlpha-700)' />
                                </Button>
                            </HStack>
                        </FormControl>
                        <FormControl mt={2} >
                            <FormLabel fontWeight='bold' color='blackAlpha.700'>Name</FormLabel>
                            <HStack>
                                <Input borderWidth={2} fontWeight='bold' color='blackAlpha.800' errorBorderColor='red.500' defaultValue={name} onChange={(event) => { editName(event.currentTarget.value) }} />
                            </HStack>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button ml={2} size='sm' onClick={() => deleteFile()} _hover={{ backgroundColor: 'red.700' }} backgroundColor='red.500' color='white'>
                            <FaTrash />
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Card variant='outline' mt={1} >
                <CardBody p={1}>
                    <Flex paddingLeft={1} paddingRight={1} >
                        <HStack flex={4} color='blue.900' alignSelf='center'>
                            <Text fontSize='md' fontWeight='bold' color='blackAlpha.700' >{name}</Text>
                        </HStack>
                        <HStack display={{ base: 'none', sm: 'none', md: 'initial' }} flex={1} justifyContent='center' alignSelf='center'>
                            <Text fontSize='md' fontWeight='bold' color='blackAlpha.700' >{getMb(size) + " Mo"}</Text>
                        </HStack>
                        <HStack display={{ base: 'none', sm: 'none', md: 'initial' }} flex={1} align='center' justifyContent='center' alignSelf='center'>
                            <Text fontSize='md' fontWeight='bold' color='blackAlpha.700' textAlign={'center'} >{downloadCount}</Text>
                        </HStack>
                        <HStack flex={2} justifyContent='end' alignSelf='center'>
                            <Button display={{ base: 'none', sm: 'none', md: 'initial' }} size='sm' onClick={() => { window.open(url, "_blank"); setTimeout(() => onUpdate(), 1000) }} >
                                <FaDownload color='var(--chakra-colors-blackAlpha-700)' />
                            </Button>
                            <Button size='sm' onClick={() => copyLink()}>
                                <FaLink color='var(--chakra-colors-blackAlpha-700)' />
                            </Button>
                            <Button size='sm' onClick={() => setEdit(true)}>
                                <FaPen color='var(--chakra-colors-blackAlpha-700)' />
                            </Button>
                            <Button size='sm' onClick={() => setInformation(true)}>
                                <FaInfoCircle color='var(--chakra-colors-blackAlpha-700)' />
                            </Button>
                        </HStack>
                    </Flex>
                </CardBody>
            </Card>
        </>
    )
}

export default function List({ authorization, onDisconnect }) {

    const [loading, setLoading] = useState(true)
    const [files, setFiles] = useState([])
    const [page, setPage] = useState(0)
    const [availableStorage, setAvailableStorage] = useState(0)
    const [totalStorage, setTotalStorage] = useState(0)
    const filePerPage = 10

    const toast = useToast()

    useEffect(() => {
        getFiles()
        getStorage()
    }, [])

    const getStorage = async () => {
        try {
            let result = await fetch(BASE_URL + "/files/storage", {
                headers: {
                    Authorization: "Bearer " + authorization
                }
            })
            let resultJSON = await result.json()
            if (resultJSON.error) {
                toast({
                    title: resultJSON.httpCode + " " + resultJSON.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            } else {
                setTotalStorage(resultJSON.storageData.totalSpace)
                setAvailableStorage(resultJSON.storageData.availableSpace)
            }
        } catch (error) {
            toast({
                title: "Internal error server",
                description: "Please retry later",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    const getFiles = async () => {
        try {
            setLoading(true)
            let result = await fetch(BASE_URL + "/files", {
                headers: {
                    Authorization: "Bearer " + authorization
                }
            })
            let resultJSON = await result.json()
            if (resultJSON.error) {
                setLoading(false)
                setFiles([])
                toast({
                    title: resultJSON.httpCode + " " + resultJSON.message,
                    description: "Please retry later",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            } else {
                setFiles(resultJSON.files)
                if (Math.floor((resultJSON.files.length - 1) / filePerPage) < page) {
                    previousPage()
                }
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            setFiles([])
            toast({
                title: "Internal error server",
                description: "Please retry later",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    const maxPage = files.length == 0 ? 0 : Math.floor((files.length - 1) / filePerPage)

    const nextPage = () => {
        if (maxPage > page) {
            setPage(page + 1)
        }
    }

    const previousPage = () => {
        if (page > 0) {
            setPage(page - 1)
        }
    }

    const availablePercent = ((availableStorage * 100) / totalStorage).toFixed(2)

    

    return (
        <Container maxW={900}  >
            <Card variant='outline' marginTop={4} marginBottom={4} minHeight={450}  >
                <CardHeader pb={1}>
                    <Heading size='lg' textAlign={{ base: 'center', sm: 'center', md: 'start' }} fontWeight='bold' color='blackAlpha.700'>Open Artifactory</Heading>
                </CardHeader>
                <CardBody>
                    {
                        loading && files.length == 0 ?
                            <Flex justifyContent={'center'} margin={4}>
                                <Spinner size='lg' />
                            </Flex>
                            :
                            files.length == 0 ?
                                <Text fontSize='lg'  textAlign='center' fontWeight='bold' color='blackAlpha.700'>No artifact found</Text>
                                :
                                <Card variant='outline' mb={2} display={{ base: 'none', sm: 'none', md: 'inherit' }} >
                                    <CardBody p={2} >
                                        <Flex justifyContent='space-around'>
                                            <HStack flex={4} justifyContent='start' color='blackAlpha.800' alignSelf='center' >
                                                <Text size='md' fontWeight='bold' color='blackAlpha.700' >{"Name"}</Text>
                                            </HStack>
                                            <HStack flex={1} justifyContent='start' alignSelf='center' >
                                                <Text size='md' fontWeight='bold' color='blackAlpha.700' >{"Size"}</Text>
                                            </HStack>
                                            <HStack flex={1} justifyContent='center' alignSelf='center'  >
                                                <Text size='md' fontWeight='bold' textAlign={'center'} color='blackAlpha.700' >{"Downloads"}</Text>
                                            </HStack>
                                            <HStack flex={2} justifyContent='end' alignSelf='center'  >
                                            </HStack>
                                        </Flex>
                                    </CardBody>
                                </Card>
                    }
                    {
                        files.slice(filePerPage * page, filePerPage * (page + 1)).map((file, index) => {
                            return (
                                <Item authorization={authorization} hash={file.hash} mimeType={file.mimeType} size={file.size} key={index} uuid={file.uuid} createdAt={file.createdAt} onUpdate={() => { getFiles(); getStorage() }} downloadCount={file.downloadCount} name={file.name} url={file.url} />
                            )
                        })
                    }
                </CardBody>
                <CardFooter justifyContent={'space-between'}>
                    <HStack >
                                <Button isDisabled={page == 0} onClick={() => previousPage()}>
                                    <FaArrowLeft color='var(--chakra-colors-blackAlpha-700)' />
                                </Button>
                                <Button isDisabled={maxPage == page || maxPage == 0} onClick={() => nextPage()}>
                                    <FaArrowRight color='var(--chakra-colors-blackAlpha-700)' />
                                </Button>
                                <Text textAlign='center' fontWeight='bold' color='blackAlpha.700' fontSize='sm'>
                                    {(page + 1) + "/" + (maxPage + 1)}
                                </Text>
                    </HStack>
                    <HStack  >
                        <Text textAlign='center' fontWeight='bold' color='blackAlpha.700' fontSize='sm'>
                            {"Storage free : " + getGo(availableStorage) + " Go ( " + availablePercent + "% )"}
                        </Text>
                    </HStack>
                    <HStack>
                        <Button ml={3} isLoading={loading} onClick={() => { getFiles(); getStorage() }}>
                            <FaUndo color='var(--chakra-colors-blackAlpha-700)' />
                        </Button>
                        <Button ml={3} onClick={() => onDisconnect()}>
                            <FaDoorOpen color='var(--chakra-colors-blackAlpha-700)' />
                        </Button>
                    </HStack>
                </CardFooter>
            </Card>
        </Container>
    )
}

