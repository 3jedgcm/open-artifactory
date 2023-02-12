import { Button, Card, CardBody, CardFooter, CardHeader, Container, Divider, Flex, Heading, HStack, Spinner, Text, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaUndo, FaUpload } from 'react-icons/fa'
import ArtifactItem from './ArtifactItem'
import ArtifactHeader from './ArtifactHeader'

const BASE_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : ""

const getMb = (size) => (size / 1000000).toFixed(2)
const getGo = (size) => (size / 1000000000).toFixed(2)

export default function Footer({ onRefresh, previousPage, nextPage, page, maxPage, availablePercent, availableStorage, loading, onUpload }) {



    return (
        <CardFooter justifyContent={'space-between'}>
            <HStack flex={1} justifyContent={'start'} >
                <Button isDisabled={page == 0} onClick={() => previousPage()}>
                    <FaArrowLeft color='var(--chakra-colors-blackAlpha-700)' />
                </Button>
                <Button isDisabled={maxPage == page || maxPage == 0} onClick={() => nextPage()}>
                    <FaArrowRight color='var(--chakra-colors-blackAlpha-700)' />
                </Button>
                <Text textAlign='center' fontWeight='bold' color='blackAlpha.700' >
                    {(page + 1) + "/" + (maxPage + 1)}
                </Text>
            </HStack>
            <HStack flex={1} justifyContent={'center'} >
                <Text textAlign='center' fontWeight='bold' color='blackAlpha.700' >
                    {"Storage free : " + getGo(availableStorage) + " Go ( " + availablePercent + "% )"}
                </Text>
            </HStack>
            <HStack flex={1} justifyContent={'end'}>
                <Button ml={3}  onClick={() => { onUpload() }}>
                    <FaUpload color='var(--chakra-colors-blackAlpha-700)' />
                </Button>
                <Button ml={3} isLoading={loading} onClick={() => { onRefresh() }}>
                    <FaUndo color='var(--chakra-colors-blackAlpha-700)' />
                </Button>
            </HStack>
        </CardFooter>
    )
}

