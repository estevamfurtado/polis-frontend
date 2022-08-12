import { CheckIcon, RepeatIcon, StarIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, IconButton, VStack } from '@chakra-ui/react'
import { useContext } from 'react'
import Card from '../../../components/Card'
import { DataContext } from '../../../contexts/DataContext'
import {CompleteCard} from '../../../types'


export default function CardInDeckPage({card}: {card: CompleteCard}) {

    const {data: {deck}} = useContext(DataContext)

    const canPaste = deck?.deck.stickers.byId[card.stickerId].pasted.length === 0;

    return <VStack paddingBottom='10'>
        <Box border='1px solid gray.300' flex='0 0 auto' boxShadow='xl'>
            <Card key={card.id} card={card}/>
        </Box>
        <HStack>
            {canPaste ? <IconButton size='sm' icon={<CheckIcon />} aria-label='Colar'/> : <></>}
            {card.forExchange 
                ? <IconButton size='sm' icon={<StarIcon />} aria-label='Não quero trocar'/>
                : <IconButton size='sm' icon={<RepeatIcon />} aria-label='Quero trocar'/>
            }
        </HStack>
    </VStack>
}


