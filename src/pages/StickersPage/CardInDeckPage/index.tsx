import { StarIcon } from '@chakra-ui/icons'
import { Box, IconButton, VStack } from '@chakra-ui/react'
import { useContext } from 'react'
import Card from '../../../components/Card'
import { AlbumContext } from '../../../contexts/AlbumContext'
import { DeckContext } from '../../../contexts/DeckContext'


export default function CardInDeckPage({cardId}: {cardId: number}) {

    const {albumData: {data: {stickers}}} = useContext(AlbumContext)
    const {deckData: {data: {cards}, actions: {toggleCard}}} = useContext(DeckContext)

    const card = cards?.cards[cardId] ?? null;
    if (!card) {return <></>}
    const sticker = stickers?.[card.stickerId] ?? null;
    if (!sticker) {return <></>}

    return <VStack paddingBottom='2' spacing='1'>
        <Box 
            border='1px solid' borderColor={card.forExchange ? 'gray.200' : 'yellow.500'} 
            flex='0 0 auto' boxShadow='xl' position='relative'>
            <Card key={card.id} cardId={cardId} w={95} h={140}/>
        </Box>
    </VStack>

}


