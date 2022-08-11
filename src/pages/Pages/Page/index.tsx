import { Heading, Text, VStack, Wrap, WrapItem, Badge } from "@chakra-ui/react"
import { useContext } from "react";
import { DataContext } from "../../../contexts/DataContext";
import { CompletePage } from "../../../types"
import { hexToRgb, calculateContrast, rgbaToString } from "../../../utils/color"
import Sticker from "./Sticker"

export default function Page ({page} : {page: CompletePage}) {

    const {data: {deck}} = useContext(DataContext);

    const stickers = page.stickers.map(sticker => {

        const isInDeck = deck?.deck.stickers.byId[sticker.id] !== undefined;
        let isPasted = false;
        let canBePasted = false;
        let  cardId = null;

        if (isInDeck) {
            isPasted = (deck?.deck.stickers.byId[sticker.id]?.pasted.length ?? 0) > 0;
            canBePasted = !isPasted;
            if (canBePasted) {
                cardId = deck?.deck.stickers.byId[sticker.id]?.notPasted[0];
            }
        }
        
        return <WrapItem key={sticker.id} w='150px' h='200px'>
            <Sticker sticker={sticker} isPasted={isPasted} canBePasted={canBePasted} cardId={cardId}/>
        </WrapItem>
    })

    const bgColor = page.backgroundColor;
    const bgRgb = hexToRgb(bgColor ?? "#ffffff");
    const darkerTone = rgbaToString(bgRgb.r, bgRgb.g, bgRgb.b, 1, 0.1, false);

    return <VStack w='100%' bg={page.backgroundColor || 'gray'} p='10' align='start'>
        
        <Wrap w='100%' spacing='10'>
            <WrapItem>
                <VStack align='start' maxW='450px' borderRadius='md' bg={darkerTone} p='3'>
                    <Heading color={'white'}>{page.title}</Heading>
                    <Text color={'white'}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore magni, fugit distinctio debitis sapiente suscipit totam quae aperiam molestiae ipsum enim, eaque eligendi culpa ad veritatis aut ullam autem commodi?</Text>
                </VStack>
            </WrapItem>

            {stickers}
        </Wrap>
    </VStack>
}