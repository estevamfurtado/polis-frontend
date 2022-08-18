import { CheckIcon, RepeatIcon, StarIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, IconButton, VStack } from '@chakra-ui/react'
import { useContext } from 'react'
import Card from '../../../components/Card'
import { DataContext } from '../../../contexts/DataContext'


export default function CardInDeckPage({cardId}: {cardId: number}) {

    const {content: {cards, stickers}, hooks: {pasteCard, toggleCard}} = useContext(DataContext)

    const card = cards?.cards[cardId] ?? null;
    if (!card) {return <></>}
    const sticker = stickers?.[card.stickerId] ?? null;
    if (!sticker) {return <></>}

    const canPaste = sticker.cards.pasted.length === 0;

    return <VStack paddingBottom='2' spacing='1'>
        <Box 
            border='1px solid' borderColor={card.forExchange ? 'gray.200' : 'yellow.500'} 
            flex='0 0 auto' boxShadow='xl' position='relative'>
            <Card key={card.id} cardId={cardId} w={95} h={140}/>

            <IconButton size='xm' onClick={()=>{toggleCard(cardId)}} aria-label='Favorita' 
                icon={<StarIcon />}
                boxSize={'1.5rem'}
                color={card.forExchange ? 'gray.300' : 'yellow.500'}
                bg='white'
                position='absolute' bottom='0' left='0' zIndex={10}
            />

        </Box>
    </VStack>

}


