import { Button, VStack, Box } from "@chakra-ui/react";
import { useContext } from "react"
import { DataContext } from "../../contexts/DataContext"
import Page from "./Page";

export default function AlbumPagesPage () {

    const {data: {completeAlbum, deck}, hooks} = useContext(DataContext);
    const isLoaded = completeAlbum !== null;

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    const filtered = completeAlbum.pages.filter(p => {
        return p.stickers.length > 1
    });

    const pages = filtered.map(p => {
        return <Page key={p.id} page={p} />;
    })

    const cardsToPaste = (deck?.deck.stickers.ids.filter (id => {
        return deck?.deck.stickers.byId[id].pasted.length === 0 
            && deck?.deck.stickers.byId[id].notPasted.length > 0
    })) ?? [];

    const button = cardsToPaste.length > 0 ? <Button
        size='sm' colorScheme='blackAlpha'
        position='absolute' top='3' right='5' zIndex={10}
        onClick={hooks.pasteAllCards}>Colar todas as cartas</Button> : <></>;

    return <Box position='relative' w='100%' h='100%' gap='0' overflowY={'hidden'}>
        <VStack w='100%' h='100%' gap='0' overflowY={'scroll'}>
            {button}
            {pages}
        </VStack>
    </Box>
}