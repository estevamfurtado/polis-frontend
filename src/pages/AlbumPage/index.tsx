import { Button, VStack, Box } from "@chakra-ui/react";
import { useContext, useEffect } from "react"
import { DataContext } from "../../contexts/DataContext"
import Page from "./Page";

export default function AlbumPage () {

    const {content: {album, stickers, cards}, hooks: {pasteAllCards}, app: {setShowAppHeader, setSection}} = useContext(DataContext);
    const isLoaded = album && stickers && cards

    useEffect(() => {
        setShowAppHeader(false);
        setSection('album')

        return () => {
            setShowAppHeader(true);
            setSection(null)
        };
    },[])

    if (!isLoaded) {
        return <></>;
    }

    const pages = album.pages.map(id => {
        return <Page key={id} pageId={id} />;
    })

    const manyCardsToPaste = cards.deck.notPasted.new.length > 30;

    const button = manyCardsToPaste ? <Button
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