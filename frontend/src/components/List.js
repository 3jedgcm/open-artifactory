import { Button, Card, CardBody, CardFooter, CardHeader, Container, Divider, Flex, Heading, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaInfoCircle, FaLink, FaPen, FaTrash } from 'react-icons/fa'
import moment from 'moment'
import { FaDownload } from 'react-icons/fa'
import { BsArrowCounterclockwise, BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'

const BASE_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : ""

const Item = function ({ authorization, hash, size, name, url, mimeType = "unknown", uuid, downloadCount, createdAt, onUpdate = () => { } }) {


    const [edit, setEdit] = useState(false)

    const toast = useToast()
    const date = moment(createdAt).format("DD/MM/YYYY HH:mm:ss")

    const deleteFile = async () => {
        let result = await fetch(BASE_URL + "/files/" + uuid, {
            headers: {
                Authorization: authorization
            },
            method: 'DELETE'
        })
        let resultJSON = await result.json()
        if (resultJSON.error) {
            toast({
                title: "An error occured",
                description: resultJSON.data.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        } else {
            onUpdate()
            toast({
                description: "The file has been successfully deleted",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
        }
    }


    const copyLink = () => {
        navigator.clipboard.writeText(url)
        toast({
            description: "Copied link to clipboard",
            status: 'success',
            duration: 2000,
            isClosable: true,
        })
    }


    return (
        <>
            <Modal isOpen={edit} onClose={() => setEdit(false)}>
                <ModalOverlay />
                <ModalContent marginLeft={4} marginRight={4}>
                    <ModalHeader>
                        <Text fontSize='xl' fontWeight='bold' color='blackAlpha.700' >{"Artifact informations"}</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Text fontSize='md' color='blackAlpha.700' >{"UUID : " + uuid}</Text>
                        <Text fontSize='md' color='blackAlpha.700' >{"Name : " + name}</Text>
                        <Text fontSize='md' color='blackAlpha.700' >{"Hash : " + hash}</Text>
                        <Divider marginTop={2} marginBottom={2} />
                        <Text fontSize='md' color='blackAlpha.700' >{"Created at : " + date}</Text>
                        <Text fontSize='md' color='blackAlpha.700' >{"Mimetype : " + mimeType}</Text>
                        <Text fontSize='md' color='blackAlpha.700' >{"Size : " + size + " octets"}</Text>
                        <Divider marginTop={2} marginBottom={2} />
                        <Text fontSize='md' color='blackAlpha.700' >{"Download time : " + downloadCount}</Text>
                    </ModalBody>
                    <ModalFooter >
                        <Button size='sm' onClick={() => { setEdit(false); deleteFile() }} _hover={{ backgroundColor: 'red.700' }} backgroundColor='red.500' color='white'>
                            <FaTrash />
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Card variant='outline' mt={1} >
                <CardBody p={1}>
                    <Flex paddingLeft={1} paddingRight={1} >
                        <HStack display={{ base: 'none', sm: 'none', md: 'none', lg: 'initial' }} flex={3} color='blue.900' alignSelf='center' overflow='hidden'>
                            <Text fontSize='sm' fontWeight='bold' color='blackAlpha.700' >{uuid}</Text>
                        </HStack>
                        <HStack flex={2} color='blue.900' alignSelf='center'>
                            <Text fontSize='sm' fontWeight='bold' color='blackAlpha.700' >{name}</Text>
                        </HStack>
                        <HStack display={{ base: 'none', sm: 'none', md: 'initial' }} flex={1} justifyContent='center' alignSelf='center'>
                            <Text fontSize='sm' fontWeight='bold' color='blackAlpha.700' >{(size / 1000000).toFixed(2) + " MB"}</Text>
                        </HStack>
                        <HStack display={{ base: 'none', sm: 'none', md: 'initial' }} flex={1} align='center' justifyContent='center' alignSelf='center'>
                            <Text fontSize='md' fontWeight='bold' color='blackAlpha.700' textAlign={'center'} >{downloadCount}</Text>
                        </HStack>
                        <HStack flex={2} justifyContent='end' alignSelf='center'>
                            <Button display={{ base: 'none', sm: 'none', md: 'initial' }} size='sm' onClick={() => { window.open(url, "_blank"); setTimeout(() => onUpdate(), 1000) }} >
                                <FaDownload />
                            </Button>
                            <Button size='sm' onClick={() => copyLink()}>
                                <FaLink />
                            </Button>
                            <Button size='sm' onClick={() => copyLink()}>
                                <FaPen />
                            </Button>
                            <Button size='sm' onClick={() => setEdit(true)}>
                                <FaInfoCircle />
                            </Button>
                            <Button size='sm' onClick={() => deleteFile()} _hover={{ backgroundColor: 'red.700' }} backgroundColor='red.500' color='white'>
                                <FaTrash />
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
    const filePerPage = 10

    const toast = useToast()

    useEffect(() => {
        getFiles()
    }, [])

    const getFiles = async () => {
        setLoading(true)
        let result = await fetch(BASE_URL + "/files", {
            headers: {
                Authorization: authorization
            }
        })
        let resultJSON = await result.json()
        if (resultJSON.error) {
            setFiles([])
            toast({
                title: "An error occured",
                description: resultJSON.data.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        } else {
            setFiles(resultJSON.files)
        }
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }

    const maxPage = Math.floor((files.length - 1) / filePerPage)

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

    return (
        <Container maxW={1200}  >
            <Card variant='outline' marginTop={4} marginBottom={4}   >
                <CardHeader pb={1}>
                    <Heading size='lg' textAlign={{ base: 'center', sm: 'center', md: 'start' }} fontWeight='bold' color='blackAlpha.700'>Open Artifactory</Heading>
                    {
                        loading ?
                            <Heading size='md' textAlign={{ base: 'center', sm: 'center', md: 'start' }} fontWeight='bold' color='blackAlpha.700'>{"Loading ..."}</Heading>
                            :
                            <Heading size='md' textAlign={{ base: 'center', sm: 'center', md: 'start' }} fontWeight='bold' color='blackAlpha.700'>{"Total : " + files.length + " file" + (files.length > 0 ? "s" : "")}</Heading>
                    }
                </CardHeader>
                <CardBody >
                    {
                        loading && files.length == 0 ?
                            <Flex justifyContent={'center'} margin={4}>
                                <Spinner size='lg' />
                            </Flex>
                            :
                            files.length == 0 ?
                                <Text>No file found</Text>
                                :
                                <Card variant='outline' mb={2} display={{ base: 'none', sm: 'none', md: 'inherit' }} >
                                    <CardBody p={2} >
                                        <Flex justifyContent='space-around'>
                                            <HStack display={{ md: 'none', lg: 'initial' }} flex={3} justifyContent='start' color='blackAlpha.800' alignSelf='center' >
                                                <Heading size='sm' fontWeight='bold' color='blackAlpha.700' >{"UUID"}</Heading>
                                            </HStack>
                                            <HStack flex={2} justifyContent='start' color='blackAlpha.800' alignSelf='center' >
                                                <Heading size='sm' fontWeight='bold' color='blackAlpha.700' >{"Name"}</Heading>
                                            </HStack>
                                            <HStack flex={1} justifyContent='start' alignSelf='center' >
                                                <Heading size='sm' fontWeight='bold' color='blackAlpha.700' >{"Size"}</Heading>
                                            </HStack>
                                            <HStack flex={1} justifyContent='center' alignSelf='center'  >
                                                <Heading size='sm' fontWeight='bold' textAlign={'center'} color='blackAlpha.700' >{"Download"}</Heading>
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
                                <Item authorization={authorization} hash={file.hash} mimeType={file.mimeType} size={file.size} key={index} uuid={file.uuid} createdAt={file.createdAt} onUpdate={() => getFiles()} downloadCount={file.downloadCount} name={file.name} url={file.url} />
                            )
                        })
                    }
                </CardBody>
                <CardFooter justifyContent={'space-between'}>
                    <HStack >
                        <Button isDisabled={page == 0} onClick={() => previousPage()}>
                            <BsArrowLeft />
                        </Button>
                        <Button isDisabled={maxPage == page} onClick={() => nextPage()}>
                            <BsArrowRight />
                        </Button>
                        <Text textAlign='center' fontWeight='bold' color='blackAlpha.700' fontSize='sm'>
                            {(page + 1) + "/" + (maxPage + 1)}
                        </Text>
                    </HStack>
                    <HStack>
                        <Button ml={3} isLoading={loading} onClick={() => getFiles()}>
                            <BsArrowCounterclockwise />
                        </Button>
                        <Button ml={3} onClick={() => onDisconnect()}>
                            <BiLogOut />
                        </Button>
                    </HStack>
                </CardFooter>
            </Card>
        </Container>
    )
}

