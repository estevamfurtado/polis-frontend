import { Button, VStack, Box } from "@chakra-ui/react";
import { useContext } from "react"
import { DataContext } from "../../contexts/DataContext"
import Page from "./Page";

export default function AlbumPagesPage () {

    const {content: {album, stickers, cards}, hooks: {pasteAllCards}} = useContext(DataContext);
    const isLoaded = album && stickers && cards

    if (!isLoaded) {
        return <></>;
    }

    const pages = album.pages.map(id => {
        return <Page key={id} pageId={id} />;
    })

    const cardsToPaste = cards.deck.notPasted.new.length > 0;

    const button = cardsToPaste ? <Button
        size='sm' colorScheme='blackAlpha'
        position='absolute' top='3' right='5' zIndex={10}
        onClick={pasteAllCards}>Colar todas as cartas
    </Button> : <></>;

    return <Box position='relative' w='100%' h='100%' gap='0' overflowY={'hidden'}>
        <VStack w='100%' h='100%' gap='0' overflowY={'scroll'}>
            {button}
            {pages}
        </VStack>
    </Box>
}