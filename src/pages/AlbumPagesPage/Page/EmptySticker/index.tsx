import { Box, Flex, Text, Image, Badge, VStack, Button } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { DataContext } from "../../../../contexts/DataContext"
import { Sticker, CardsCatalog } from "../../../../types"

export default function EmptySticker ({sticker} : {sticker: Sticker & {cards: CardsCatalog }}) {

    const {hooks: {pasteCard}} = useContext(DataContext);

    const [isLoading, setIsLoading] = useState(false);

    const canBePasted = sticker.cards.notPasted.new.length > 0;
    const pasteButton = canBePasted ? 
        !isLoading ? <Button colorScheme='alphaWhite' onClick={handlePaste}>Colar!</Button>
        : <Button colorScheme='alphaWhite' isDisabled>Colando...</Button> 
    : <></>;

    const bg = canBePasted ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';
    const cursor = canBePasted ? 'pointer' : 'default';
    const border = canBePasted ? 'solid 3px rgba(255,255,255,0.2)' : 'none';
    const onHover = canBePasted ? {boxShadow: 'md'} : {};
    const onClick = canBePasted ? () => pasteCard(sticker.cards.notPasted.new[0]) : () => {};

    return <Flex 
        gap={1} direction='column' 
        align='center' justify='center' 
        w='100%' h='100%' 
        bg={bg} 
        p='5' borderRadius='md'
        cursor={cursor}
        border={border}
        _hover={onHover}
        onClick={onClick}
    >
        <Text color='white' fontSize='xs' textAlign={'center'}>{sticker.identifier}</Text>
        <Text color='white' fontSize='xs' textAlign={'center'}>{sticker.title}</Text>
        {pasteButton}
    </Flex>

    async function handlePaste() {
        setIsLoading(true);
        await pasteCard(sticker.cards.notPasted.new[0]);
        setIsLoading(false);
    }
}