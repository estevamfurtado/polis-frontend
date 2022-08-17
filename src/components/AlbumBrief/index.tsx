import {useContext} from 'react';
import {DataContext} from '../../contexts/DataContext';
import { Wrap, Box, Flex, VStack, CircularProgress, CircularProgressLabel, HStack} from '@chakra-ui/react';


export default function AlbumBrief() {

    const {content: {album, pages, stickers}} = useContext(DataContext);

    if (!album) {return <></>}

    const items = album.pages.map(pId => <PageItem key={pId} pageId={pId} />)

    const legenda = <Legenda />


    const progressValue = 50;
    const progress = <AlbumProgress value={progressValue} />

    return <VStack align='start'>
        {legenda}
        {progress}
        {items}
    </VStack>


    function PageItem ({pageId}: {pageId: number}) {
        const page = pages?.[pageId] ?? null;
        if (!page) {return <></>}
        if (page.stickers.length === 0) {return <></>}

        return <VStack align='start'>
            <Box fontSize='sm' fontWeight='bold'>{page.title}</Box>
            <Wrap spacing='0'>
                {page.stickers.map(sId => <StickerItem key={sId} stickerId={sId}/>)}
            </Wrap>
        </VStack>
    }

    function StickerItem ({stickerId}: {stickerId: number}) {

        const sticker = stickers?.[stickerId] ?? null;
        if (!sticker) {return <></>}

        const num = sticker.identifier.split('-')[1].trim();
        const status = color();
        return <Flex 
            key={sticker.id}    
            align='center' justify='center' 
            w='25px' h='25px'
            border='1px solid' borderColor='gray.100' 
            fontSize='xs' fontWeight='bold' 
            bg={status.bg} color={status.color} 
        >{num}</Flex>

        function color() {

            if (!sticker) {return stickerStatus.empty}

            const isPasted = sticker.cards.pasted.length > 0;
            const hasNotPastedCards = sticker.cards.notPasted.all.length > 0;
            const doesntHave = sticker.cards.all.length === 0;
            const toPaste = sticker.cards.notPasted.new.length > 0;
            return doesntHave
                ? stickerStatus.empty 
                    : (toPaste
                        ? stickerStatus.available
                        : (hasNotPastedCards
                            ? stickerStatus.repeated
                            : stickerStatus.pasted));
        }
    }

    function AlbumProgress ({value} : {value: number}) {
        return <HStack justify={'center'} align='center' w='100%'>
            <CircularProgress value={value*100} color='green.400' size='120px'>
                <CircularProgressLabel>{
                    `${Math.round(value*100)}%`
                }</CircularProgressLabel>
            </CircularProgress>
        </HStack>
    }

    function Legenda () {
        return <Wrap align='center' justify='center' w='100%'>
            {statusLegendaItem(stickerStatus.empty)}
            {statusLegendaItem(stickerStatus.available)}
            {statusLegendaItem(stickerStatus.pasted)}
            {statusLegendaItem(stickerStatus.repeated)}
        </Wrap>
    
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
}

const stickerStatus = {
    empty: {
        bg: 'white',
        color: 'gray.500',
        title: 'Você não tem ainda'
    },  
    pasted: {
        bg: 'green.400',
        color: 'white',
        title: 'Colada'
    },
    available: {
        bg: 'blue.400',
        color: 'white',
        title: 'Pronto para colar'
    },
    repeated: {
        bg: 'orange.400',
        color: 'white',
        title: 'Repetida'
    },
}