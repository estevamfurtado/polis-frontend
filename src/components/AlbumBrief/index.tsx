import {useContext} from 'react';
import {DataContext} from '../../contexts/DataContext';
import { Wrap, Box, Flex, VStack} from '@chakra-ui/react';


export default function AlbumBrief() {

    const {data: {completeAlbum, deck}} = useContext(DataContext);

    if (!completeAlbum || !deck) {
        return <>nao tem album ou deck</>
    }

    const pages = completeAlbum?.pages

    const items = pages.map(page => {
        if (page.stickers.length === 1) {
            return <></>
        }
        return <VStack align='start'> key={page.id}
            <Box fontSize='sm' fontWeight='bold'>{page.title}</Box>
            <Wrap spacing='0'>
            {page.stickers.map(sticker => {
                const num = sticker.identifier.split('-')[1].trim();
                const status = color(sticker.id);
                return <Flex 
                    key={sticker.id}    
                    align='center' justify='center' 
                    w='25px' h='25px'
                    border='1px solid' borderColor='gray.100' 
                    fontSize='xs' fontWeight='bold' 
                    bg={status.bg} color={status.color} 
                    >{num}</Flex>
            })}
            </Wrap>
        </VStack>
    })

    const legenda = <Wrap align='center' justify='center' w='100%'>
        {statusLegendaItem(stickerStatus.empty)}
        {statusLegendaItem(stickerStatus.available)}
        {statusLegendaItem(stickerStatus.pasted)}
        {statusLegendaItem(stickerStatus.repeated)}
    </Wrap>

    return <VStack align='start'>
        {legenda}
        {items}
    </VStack>

    function color(stickerId: number) {
        const isPasted = deck?.deck.stickers.byId[stickerId]?.pasted.length ?? 0 > 0;
        const hasNotPastedCards = deck?.deck.stickers.byId[stickerId]?.notPasted.length ?? 0 > 0;
        const doesntHave = !isPasted && !hasNotPastedCards;
        const toPaste = !isPasted && hasNotPastedCards;
        return doesntHave
            ? stickerStatus.empty 
                : (toPaste
                    ? stickerStatus.available
                    : (hasNotPastedCards
                        ? stickerStatus.repeated
                        : stickerStatus.pasted));
    }

    function statusLegendaItem (props: {bg: string, color: string, title: string}) {
        return <Flex 
            align='center' justify='center' 
            h='25px'
            border='1px solid' borderColor='gray.100' 
            fontSize='xs' fontWeight='bold' 
            bg={props.bg} color={props.color} 
            px='2'
        >
            {props.title}
        </Flex>
    }
}

const stickerStatus = {
    empty: {
        bg: 'white',
        color: 'gray.500',
        title: 'Você não tem ainda'
    },  
    pasted: {
        bg: 'gray.200',
        color: 'gray.800',
        title: 'Colada'
    },
    available: {
        bg: 'blue.400',
        color: 'white',
        title: 'Você tem para colar'
    },
    repeated: {
        bg: 'orange.400',
        color: 'white',
        title: 'Repetida'
    },
}