import { Heading, Text, VStack, Wrap, WrapItem, Box } from "@chakra-ui/react"

import PageSticker from "./PageSticker";

type FunctionalPage = {
    title: string,
    badge?: string,
    description?: string,
    color?: string,
    stickers: number[],
}

export default function Page ({page, classType} : {page: FunctionalPage, classType: string}) {

    return <VStack w='100%' bg={page.color || 'gray'} p='3' align='center' borderRadius='md'
        id={`${page.title.replaceAll(' ', '')}`} 
        className={classType}
    >
        <Wrap w='100%' spacing='2' maxW='700px'>
            <WrapItem w='100%' >
                    <VStack align='start' maxW='450px' borderRadius='md' bg={'rgba(0,0,0,0.1)'} p='3'>
                        {page.badge ? <Box 
                            bg={'rgba(255,255,255,0.1)'} color='white' 
                            borderRadius='sm' py='1' px='3'
                            fontSize='sm' fontWeight='bold'
                            position='sticky'
                            top='10px'
                        >
                            {page.badge}
                        </Box> : <></>}
                        <Heading fontSize='2xl' color={'white'}>{page.title}</Heading>
                        {
                            page.title ? <Text fontSize='sm' color={'white'}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore magni, fugit distinctio debitis sapiente suscipit totam quae aperiam molestiae ipsum enim, eaque eligendi culpa ad veritatis aut ullam autem commodi?</Text>
                            : <></>
                        }
                    </VStack>
            </WrapItem>

            {
                page.stickers.map(id => {
                    return <PageSticker stickerId={id} key={id}/>
                })            
            }
        </Wrap>
    </VStack>

}