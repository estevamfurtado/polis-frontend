import { Heading, Text, VStack, Wrap, WrapItem, Badge, Box } from "@chakra-ui/react"
import { useContext } from "react";
import { DataContext } from "../../../contexts/DataContext";
import { CompletePage } from "../../../types"
import { hexToRgb, calculateContrast, rgbaToString } from "../../../utils/color"

import EmptySticker from "./EmptySticker"
import PoliticianSticker from "../../../components/PartySticker";
import PartySticker from "../../../components/PoliticianSticker";
import Sticker from "../../../components/Sticker";
import PageSticker from "./PageSticker";

export default function Page ({pageId} : {pageId: number}) {

    const {content: {pages}} = useContext(DataContext);

    const page = pages?.[pageId] ?? null;

    if (!page) {
        return <></>
    }

    const stickers = page.stickers.map(id => {
        return <PageSticker stickerId={id} key={id}/>
    })


    const bgColor = page.backgroundColor;
    const bgRgb = hexToRgb(bgColor ?? "#ffffff");
    const darkerTone = rgbaToString(bgRgb.r, bgRgb.g, bgRgb.b, 1, 0.1, false);
    const lighterTone = rgbaToString(bgRgb.r, bgRgb.g, bgRgb.b, 1, 0.25, true);

    return <VStack w='100%' bg={page.backgroundColor || 'gray'} p='3' align='start'>
        <Wrap w='100%' spacing='2'>
            <WrapItem>
                    <VStack align='start' maxW='450px' borderRadius='md' bg={darkerTone} p='3'>
                        <Box 
                            bg={lighterTone} color='white' 
                            borderRadius='sm' py='1' px='3'
                            fontSize='md' fontWeight='bold'
                            position='sticky'
                            top='10px'
                        >
                            {page.badge}
                        </Box>
                        <Heading color={'white'}>{page.title}</Heading>
                        <Text color={'white'}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore magni, fugit distinctio debitis sapiente suscipit totam quae aperiam molestiae ipsum enim, eaque eligendi culpa ad veritatis aut ullam autem commodi?</Text>
                    </VStack>
            </WrapItem>

            {stickers}
        </Wrap>
    </VStack>

}