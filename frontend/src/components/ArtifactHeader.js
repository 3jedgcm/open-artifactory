import { Card, CardBody, Flex, HStack, Text } from '@chakra-ui/react'

export default function ArtifactHeader() {

    return (<Card variant='outline' mb={2} display={{ base: 'none', sm: 'none', md: 'inherit' }} >
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
    )
}

