import { Heading, Text, VStack, Wrap, WrapItem, Badge, Box } from "@chakra-ui/react"
import { hexToRgb, rgbaToString } from "../../../utils/color"

import PageSticker from "./PageSticker";

type FunctionalPage = {
    title: string,
    badge?: string,
    description?: string,
    color?: string,
    stickers: number[],
}

export default function Page ({page} : {page: FunctionalPage}) {

    const stickers = page.stickers.map(id => {
        return <PageSticker stickerId={id} key={id}/>
    })


    const bgColor = page.color;
    const bgRgb = hexToRgb(bgColor ?? "#ffffff");
    const darkerTone = rgbaToString(bgRgb.r, bgRgb.g, bgRgb.b, 1, 0.1, false);
    const lighterTone = rgbaToString(bgRgb.r, bgRgb.g, bgRgb.b, 1, 0.25, true);

    return <VStack w='100%' bg={page.color || 'gray'} p='3' align='start'>
        <Wrap w='100%' spacing='2'>
            <WrapItem>
                    <VStack align='start' maxW='450px' borderRadius='md' bg={darkerTone} p='3'>
                        {page.badge ? <Box 
                            bg={lighterTone} color='white' 
                            borderRadius='sm' py='1' px='3'
                            fontSize='md' fontWeight='bold'
                            position='sticky'
                            top='10px'
                        >
                            {page.badge}
                        </Box> : <></>}
                        <Heading color={'white'}>{page.title}</Heading>
                        {
                            page.title ? <Text color={'white'}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore magni, fugit distinctio debitis sapiente suscipit totam quae aperiam molestiae ipsum enim, eaque eligendi culpa ad veritatis aut ullam autem commodi?</Text>
                            : <></>
                        }
                    </VStack>
            </WrapItem>

            {stickers}
        </Wrap>
    </VStack>

}