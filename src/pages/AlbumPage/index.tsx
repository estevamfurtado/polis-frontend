import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Button, VStack, Box, Flex, Center, HStack, IconButton } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../contexts/DataContext"
import Page from "./Page";

export default function AlbumPage () {

    const {content: {album, stickers, cards}, hooks: {pasteAllCards}, app: {setShowAppHeader, setSection}} = useContext(DataContext);
    const isLoaded = album && stickers && cards

    const [type, setType] = useState<'party' | 'ranking' | 'state'>('party');

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

    return <Flex direction='column' position='relative' w='100%' h='100%' gap='0' overflowY={'hidden'}>
        <VStack w='100%' gap='0' overflowY={'scroll'} flex='1 1 auto' py='3'>
            {button}
            {pages}
        </VStack>
        <Footer/>
    </Flex>


    function Footer() {
        return <Center w='100%' h='50px' bg='gray.700' flex='0 0 auto' p='3'>
            <HStack justify={'space-between'} w='100%' h='100%'>
                <HStack>
                    <Choice title='Partidos' choice='party'/>
                    <Choice title='Estados' choice='state'/>
                    <Choice title='Ranking' choice='ranking'/>
                </HStack>
                <HStack>
                    <IconButton aria-label="down" icon={<TriangleDownIcon/>}/>
                    <IconButton aria-label="up" icon={<TriangleUpIcon/>}/>
                </HStack>
            </HStack>
        </Center>
    }
    
    function Choice({title, choice} : {title: string, choice: 'ranking' | 'state' | 'party'}) {

        const isSelected = type === choice;

        return <Button variant={isSelected ? 'solid' : 'ghost'} size='sm' onClick={onClick}>
            {title}
        </Button>

        function onClick() {
            setType(choice);
        }
    }
}


