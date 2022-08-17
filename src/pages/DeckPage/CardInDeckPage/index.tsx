import { CheckIcon, RepeatIcon, StarIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, IconButton, VStack } from '@chakra-ui/react'
import { useContext } from 'react'
import Card from '../../../components/Card'
import { DataContext } from '../../../contexts/DataContext'
import {CompleteCard} from '../../../types'
import * as api from '../../../services/reqs'


export default function CardInDeckPage({cardId}: {cardId: number}) {

    const {content: {cards, stickers}, hooks: {pasteCard, toggleCard}} = useContext(DataContext)

    const card = cards?.cards[cardId] ?? null;
    if (!card) {return <></>}
    const sticker = stickers?.[card.stickerId] ?? null;
    if (!sticker) {return <></>}

    const canPaste = sticker.cards.pasted.length === 0;

    return <VStack paddingBottom='10'>
        <Box border='1px solid gray.300' flex='0 0 auto' boxShadow='xl'>
            <Card key={card.id} card={card}/>
        </Box>
        <HStack>
            {canPaste ? <IconButton onClick={()=>{pasteCard(cardId)}} size='sm' icon={<CheckIcon />} aria-label='Colar'/> : <></>}
            <IconButton size='sm' onClick={()=>{toggleCard(cardId)}} icon={<StarIcon />} aria-label='Favorita' 
                color={card.forExchange ? 'gray.300' : 'teal'}
            />
        </HStack>
    </VStack>

}


