import { Box, Flex, Text, Image, Badge, VStack, Button } from "@chakra-ui/react"
import { useContext } from "react"
import { DataContext } from "../../../../contexts/DataContext"
import { Sticker, CardsCatalog } from "../../../../types"

export default function EmptySticker ({sticker} : {sticker: Sticker & {cards: CardsCatalog }}) {

    const {hooks: {pasteCard}} = useContext(DataContext);

    const canBePasted = sticker.cards.notPasted.new.length > 0;
    const pasteButton = canBePasted ? <Button variant='solid' colorScheme='alphaWhite' onClick={() => pasteCard(sticker.cards.notPasted.new[0])}>Colar!</Button> : <></>;

    return <Flex gap={1} direction='column' align='center' justify='center' w='100%' h='100%' bg='rgba(0,0,0,0.2)' p='5' borderRadius='md'>
        <Text color='white' fontSize='sm' textAlign={'center'}>{sticker.identifier}</Text>
        <Text fontSize='sm' textAlign={'center'}>{sticker.title}</Text>
        {pasteButton}
    </Flex>
}