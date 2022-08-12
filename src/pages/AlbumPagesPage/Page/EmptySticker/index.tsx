import { Box, Flex, Text, Image, Badge, VStack, Button } from "@chakra-ui/react"
import { useContext } from "react"
import { DataContext } from "../../../../contexts/DataContext"
import { CompleteSticker } from "../../../../types"

export default function EmptySticker ({sticker} : {sticker: CompleteSticker}) {

    const {data: {deck}, hooks} = useContext(DataContext);

    const cardId = canBePasted();
    const pasteButton = cardId ? <Button onClick={() => hooks.pasteCard(cardId)}>Paste</Button> : <></>;

    return <Flex gap={1} direction='column' align='center' justify='center' w='100%' h='100%' bg='rgba(0,0,0,0.2)' p='5' borderRadius='md'>
        <Text color='white' fontSize='sm' textAlign={'center'}>{sticker.identifier}</Text>
        <Text fontSize='sm' textAlign={'center'}>{sticker.title}</Text>
        {pasteButton}
    </Flex>
    

    function canBePasted () {
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
        return canBePasted ? cardId : null;
    }
}