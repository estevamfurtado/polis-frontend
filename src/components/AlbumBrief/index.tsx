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
            <Wrap spacing='1'>
            {page.stickers.map(sticker => {
                const num = sticker.identifier.split('-')[1].trim();
                const stickerColor = color(sticker.id);
                return <Flex borderRadius='sm' border='1px solid' borderColor='gray.300' bg={stickerColor} key={sticker.id} align='center' justify='center' fontSize='sm' w='30px' h='30px'>{num}</Flex>
            })}
            </Wrap>
        </VStack>
    })

    return <VStack  align='start'>
        {items}
    </VStack>

    function color(stickerId: number) {
        const isPasted = deck?.deck.stickers.byId[stickerId]?.pasted.length ?? 0 > 0;
        const hasNotPastedCards = deck?.deck.stickers.byId[stickerId]?.notPasted.length ?? 0 > 0;
        const doesntHave = !isPasted && !hasNotPastedCards;
        const toPaste = !isPasted && hasNotPastedCards;
        return doesntHave ? 'white' : (toPaste ? 'green' : (hasNotPastedCards ? 'orange' : 'gray.300'));
    }
}