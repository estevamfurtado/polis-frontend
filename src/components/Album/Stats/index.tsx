import {useContext} from 'react';
import {DataContext} from '../../../contexts/DataContext';
import { Wrap, Box, Flex, VStack} from '@chakra-ui/react';
import Progress from '../Progress';

export default function Stats() {

    const {content: {album, pages, stickers, politicianRecords}} = useContext(DataContext);

    if (!album) {return <></>}

    const items = album.pages.map(pId => <PageItem key={pId} pageId={pId} />)

    const legenda = <Legenda />

    return <VStack align='center' spacing='5' w='100%' maxW='700px' p='5'>
        <Progress size='120px' fontSize='lg'/>
        {legenda}
        <VStack align='start' spacing='1'>
            {items}
        </VStack>
    </VStack>


    function PageItem ({pageId}: {pageId: number}) {
        const page = pages?.[pageId] ?? null;
        if (!page) {return <></>}
        if (page.stickers.length === 0) {return <></>}
        
        return <VStack align='start' bg='gray.900' p='2' w='100%' borderRadius='sm'>
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
        }
    }

    function Legenda () {
        return <Wrap align='center' justify='center' w='100%' flex='0 0 auto'>
            {statusLegendaItem(stickerStatus.empty)}
            {statusLegendaItem(stickerStatus.special)}
            {statusLegendaItem(stickerStatus.good)}
            {statusLegendaItem(stickerStatus.neutral)}
            {statusLegendaItem(stickerStatus.bad)}
        </Wrap>
    
        function statusLegendaItem (props: {bg: string, color: string, title: string}) {
            return <Flex 
                align='center' justify='center' 
                h='25px'
                fontSize='12px' fontWeight='bold' 
                borderRadius='sm'
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
        title: 'Figurinha especial'
    },
    good: {
        bg: 'green.400',
        color: 'white',
        title: 'Político Top 50'
    },
    neutral: {
        bg: 'yellow.400',
        color: 'black',
        title: 'Boa metade'
    },
    bad: {
        bg: 'red.400',
        color: 'white',
        title: 'Metade ruim'
    },
    empty: {
        bg: 'gray.700',
        color: 'white',
        title: 'Vazio'
    },
}