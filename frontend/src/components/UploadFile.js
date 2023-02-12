import { Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, VStack, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import Dropzone from './Dropzone'

const BASE_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : ""

export default function UploadFile({ getFiles, getStorage, authorization, upload, setUpload }) {

    const [percent, setPercent] = useState(0)
    const [uploadLoading, setUploadLoading] = useState(false)
    const toast = useToast()

    const uploadFiles = (file, onProgress) =>
        new Promise((resolve, reject) => {
            const formData = new FormData()
            formData.append("file", file)
            formData.append("name", file.name)
            const xhr = new XMLHttpRequest()
            xhr.upload.addEventListener('progress', e => onProgress(e.loaded / e.total))
            xhr.addEventListener('load', () => resolve({ status: xhr.status, body: xhr.responseText }))
            xhr.addEventListener('error', () => reject(new Error('File upload failed')))
            xhr.addEventListener('abort', () => reject(new Error('File upload aborted')))
            xhr.open('POST', BASE_URL + "/upload", true);
            xhr.setRequestHeader("Authorization", "Bearer " + authorization)
            xhr.send(formData)
        })

    const uploadArtifact = async (file) => {
        try {
            setUploadLoading(true)
            uploadFiles(file, (value) => {
                setPercent((value * 100).toFixed(0))
                if (value == 1) {
                    setUploadLoading(false)
                    setUpload(false)
                    setTimeout(() => {
                        getFiles()
                        getStorage()
                    }, 1000)
                }
            })
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


    return (
        <Modal isOpen={upload} onClose={() => { uploadLoading == false && setUpload(false) }}>
            <ModalOverlay />
            <ModalContent marginLeft={4} marginRight={4}>
                <ModalHeader>
                    <Text fontSize='2xl' textAlign='center' fontWeight='bold' color='blackAlpha.700' >{"Upload artifactory"}</Text>
                </ModalHeader>
                <Divider />
                <ModalCloseButton />
                <ModalBody mt={2} >
                    {
                        uploadLoading ?
                            <VStack justifyContent={'center'} margin={4}>
                                <Text fontSize='lg' textAlign='center' fontWeight='bold' color='blackAlpha.700'>{percent + "%"} </Text>
                                <Spinner size='md' />
                            </VStack>
                            :
                            <Dropzone uploadLoading={uploadLoading} onDropFile={(file) => { uploadArtifact(file) }} />
                    }
                </ModalBody>
                <ModalFooter justifyContent='center' mb={4}>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

