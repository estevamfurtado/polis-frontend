import { Flex, Text, Button } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { DeckContext } from "../../../../../../contexts/DeckContext";
import { Sticker } from "../../../../../../types"

export default function EmptySticker ({sticker, pasteCardId} : {sticker: Sticker, pasteCardId?: number | null}) {

    const [isLoading, setIsLoading] = useState(false);
    
    const {deckData: {actions: {pasteCard}}} = useContext(DeckContext);


    const pasteButton = pasteCardId ? 
        <Button bg='rgba(255,255,255,0.2)' 
            color='white' 
            isDisabled={isLoading} 
            onClick={handlePaste}>
                {isLoading ? 'Colando...' : `Colar!`}
        </Button>
    : <></>;

    const bg = pasteCardId ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';
    const cursor = pasteCardId ? 'pointer' : 'default';
    const border = pasteCardId ? 'solid 3px rgba(255,255,255,0.2)' : 'none';
    const onHover = pasteCardId ? {boxShadow: 'md'} : {};

    return <Flex 
        gap={1} direction='column' 
        align='center' justify='center' 
        w='100%' h='100%' 
        bg={bg} 
        p='5' borderRadius='md'
        cursor={cursor}
        border={border}
        _hover={onHover}
        onClick={handlePaste}
    >
        <Text color='white' fontSize='xs' textAlign={'center'}>{sticker.title}</Text>
        {pasteButton}
    </Flex>

    async function handlePaste() {
        if (pasteCardId && !isLoading) {
            setIsLoading(true);
            await pasteCard(pasteCardId);
            setIsLoading(false);
        }
    }
}