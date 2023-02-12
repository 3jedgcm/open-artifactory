import { Button, CardFooter, HStack, Text, VStack } from '@chakra-ui/react'
import { FaArrowLeft, FaArrowRight, FaUndo, FaUpload } from 'react-icons/fa'
const getGo = (size) => (size / 1000000000).toFixed(2)

export default function Footer({ onRefresh, previousPage, nextPage, page, maxPage, availablePercent, availableStorage, loading, onUpload }) {

    return (
        <>
            <CardFooter justifyContent={'space-between'}>
                <VStack flex={1} width='100%'>
                    <HStack flex={1} width='100%' >
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
                        <HStack display={{ base: 'none', sm: 'none', md: 'inherit' }} flex={1} justifyContent={'center'} >
                            <Text textAlign='center' fontWeight='bold' color='blackAlpha.700' >
                                {"Storage free : " + getGo(availableStorage) + " Go ( " + availablePercent + "% )"}
                            </Text>
                        </HStack>
                        <HStack flex={1} justifyContent={'end'}>
                            <Button ml={3} onClick={() => { onUpload() }}>
                                <FaUpload color='var(--chakra-colors-blackAlpha-700)' />
                            </Button>
                            <Button ml={3} isLoading={loading} onClick={() => { onRefresh() }}>
                                <FaUndo color='var(--chakra-colors-blackAlpha-700)' />
                            </Button>
                        </HStack>
                    </HStack>
                    <HStack display={{ base: 'inherit', sm: 'inherit', md: 'none' }} flex={1} justifyContent={'center'} >
                        <Text textAlign='center' fontWeight='bold' color='blackAlpha.700' >
                            {"Storage free : " + getGo(availableStorage) + " Go ( " + availablePercent + "% )"}
                        </Text>
                    </HStack>
                </VStack>
            </CardFooter>
        </>
    )
}

