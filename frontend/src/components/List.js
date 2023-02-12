import { Card, CardBody, CardHeader, Container, Divider, Flex, Heading, Spinner, Text, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ArtifactItem from './ArtifactItem'
import ArtifactHeader from './ArtifactHeader'
import Footer from './Footer'
import UploadFile from './UploadFile'

const BASE_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : ""

export default function List({ authorization, onDisconnect }) {

    const [upload, setUpload] = useState(false)
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
                if(resultJSON.httpCode == 401) {
                    onDisconnect()
                }
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

    const getStorage = async () => {
        try {
            setLoading(true)
            let result = await fetch(BASE_URL + "/files/storage", {
                headers: {
                    Authorization: "Bearer " + authorization
                }
            })
            let resultJSON = await result.json()
            if (resultJSON.error) {
                if(resultJSON.httpCode == 401) {
                    onDisconnect()
                }
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
        setLoading(false)
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
            <UploadFile 
                upload={upload} 
                setUpload={(value) => setUpload(value)} 
                authorization={authorization} 
                getFiles={() => getFiles()}  
                getStorage={() => getStorage()} 
            />
            <Card variant='outline' marginTop={4} marginBottom={4} minHeight={450}  >
                <CardHeader pb={1}>
                    <Heading size='lg' textAlign={{ base: 'center', sm: 'center', md: 'start' }} fontWeight='bold' color='blackAlpha.700'>Open Artifactory</Heading>
                </CardHeader>
                <Divider mt={3} />
                <CardBody>
                    {
                        loading && files.length == 0 ?
                            <Flex justifyContent={'center'} margin={4}>
                                <Spinner size='lg' />
                            </Flex>
                            :
                            files.length == 0 ?
                                <Text fontSize='lg' textAlign='center' fontWeight='bold' color='blackAlpha.700'>No artifact found</Text>
                                :
                                <ArtifactHeader />
                    }
                    {
                        files.slice(filePerPage * page, filePerPage * (page + 1)).map((file, index) => {
                            return (
                                <ArtifactItem authorization={authorization} hash={file.hash} mimeType={file.mimeType} size={file.size} key={index} uuid={file.uuid} createdAt={file.createdAt} onUpdate={() => { getFiles(); getStorage() }} downloadCount={file.downloadCount} name={file.name} url={file.url} />
                            )
                        })
                    }
                </CardBody>
                <Footer
                    nextPage={() => nextPage()}
                    previousPage={() => previousPage()}
                    onUpload={() => { setUpload(true) }}
                    onRefresh={() => { getFiles(); getStorage() }}
                    availableStorage={availableStorage}
                    availablePercent={availablePercent}
                    page={page}
                    maxPage={maxPage}
                    loading={loading}
                />
            </Card>
        </Container>
    )
}

