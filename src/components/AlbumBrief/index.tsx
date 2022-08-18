import {useContext} from 'react';
import {DataContext} from '../../contexts/DataContext';
import { Wrap, Box, Flex, VStack, CircularProgress, CircularProgressLabel, HStack} from '@chakra-ui/react';


export default function AlbumBrief() {

    const {content: {album, pages, stickers, politicianRecords}} = useContext(DataContext);

    if (!album) {return <></>}

    const items = album.pages.map(pId => <PageItem key={pId} pageId={pId} />)

    const legenda = <Legenda />

    let total = 0;
    let pasted = 0;

    for (const pageId of album.pages) {
        const page = pages?.[pageId] ?? null;
        if (page) {
            for (const stickerId of page.stickers) {
                const sticker = stickers?.[stickerId] ?? null;
                if (sticker) {
                    total++;
                    if (sticker.cards.pasted.length > 0) {
                        pasted++;
                    }
                }
            }
        }
    }

    const progressValue = pasted/total;
    const progress = <AlbumProgress value={progressValue} />

    return <VStack align='start' spacing='5'>
        {legenda}
        {progress}
        <VStack align='start' spacing='1'>
            {items}
        </VStack>
    </VStack>


    function PageItem ({pageId}: {pageId: number}) {
        const page = pages?.[pageId] ?? null;
        if (!page) {return <></>}
        if (page.stickers.length === 0) {return <></>}
        
        return <VStack align='start' bg='gray.200' p='2' w='100%' borderRadius='sm'>
            <Box fontSize='xs' fontWeight='bold'>{page.title}</Box>
            <Wrap spacing='0'>
                {page.stickers.map(sId => <StickerItem key={sId} stickerId={sId}/>)}
            </Wrap>
        </VStack>
    }

    function StickerItem ({stickerId}: {stickerId: number}) {

        const sticker = stickers?.[stickerId] ?? null;
        if (!sticker) {return <></>}

        const record = sticker.politicianRecordId ? politicianRecords?.[sticker.politicianRecordId] ?? null : null;

        const num = sticker.identifier.split('-')[1].trim();
        
        const status = color()

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

            const doesntHave = sticker.cards.all.length === 0;
            if (doesntHave) {return stickerStatus.empty}

            const isPolitician = sticker.type === 'politician';
            if (!isPolitician) {
                return stickerStatus.special;
            } else {
                if (!record) {return stickerStatus.bad}
                const value = record.scoreRanking;
                if (!value) {return stickerStatus.bad}
                if (value <= 50) {return stickerStatus.good}
                if (value <= 250) {return stickerStatus.neutral}
                return stickerStatus.bad;
            }

            // const hasNotPastedCards = sticker.cards.notPasted.all.length > 0;
            // const toPaste = sticker.cards.notPasted.new.length > 0;
            // return doesntHave
            //     ? stickerStatus.empty 
            //         : (toPaste
            //             ? stickerStatus.available
            //             : (hasNotPastedCards
            //                 ? stickerStatus.repeated
            //                 : stickerStatus.pasted));
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
    special: {
        bg: 'purple.500',
        color: 'white',
        title: 'Special'
    },
    good: {
        bg: 'green.400',
        color: 'white',
        title: 'OK'
    },
    neutral: {
        bg: 'yellow.400',
        color: 'black',
        title: 'OK'
    },
    bad: {
        bg: 'red.400',
        color: 'white',
        title: 'OK'
    },
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
        bg: 'green.500',
        color: 'white',
        title: 'Repetida'
    },
}