import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Button, VStack, Flex, Center, HStack, IconButton } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../contexts/DataContext"
import Page from "./Page";

export default function AlbumPage () {

    const {content: {pagesByParties, pagesByStates, cards}, hooks: {pasteAllCards}, app: {setShowAppHeader, setSection}} = useContext(DataContext);

    const [type, setType] = useState<'party' | 'state'>('party');


    useEffect(() => {
        setShowAppHeader(false);
        setSection('album');

        return () => {
            setShowAppHeader(true);
            setSection(null);
        }
    },[])

    const manyCardsToPaste = cards?.deck.notPasted.new.length ?? 0 > 30;

    const button = manyCardsToPaste ? <Button
        size='sm' colorScheme='blackAlpha'
        position='absolute' top='3' right='5' zIndex={10}
        onClick={pasteAllCards}>Colar todas as cartas
    </Button> : <></>;

    return <Flex direction='column' position='relative' w='100%' h='100%' gap='0' overflowY={'hidden'}>
        {button}
        <VStack w='100%' gap='0' overflowY={'scroll'} flex='1 1 auto' py='3' hidden={type !== 'party'} onScroll={onScroll}>            
            <Pages pages={pagesByParties}/>
        </VStack>

        <VStack w='100%' gap='0' overflowY={'scroll'} flex='1 1 auto' py='3' hidden={type !== 'state'} onScroll={onScroll}>            
            <Pages pages={pagesByStates}/>
        </VStack>

        <Footer/>
    </Flex>


    function Footer() {
        return <Center w='100%' h='50px' bg='gray.700' flex='0 0 auto' p='3'>
            <HStack justify={'space-between'} w='100%' h='100%'>
                <HStack>
                    <Choice title='Partidos' choice='party'/>
                    <Choice title='Estados' choice='state'/>
                </HStack>
                <HStack>
                    <IconButton aria-label="down" icon={<TriangleDownIcon/>}/>
                    <IconButton aria-label="up" icon={<TriangleUpIcon/>}/>
                </HStack>
            </HStack>
        </Center>
    }
    
    function Choice({title, choice} : {title: string, choice: 'state' | 'party'}) {

        const isSelected = type === choice;

        return <Button variant={isSelected ? 'solid' : 'ghost'} size='sm' onClick={onClick}>
            {title}
        </Button>

        function onClick() {
            setType(choice);
        }
    }

    function onScroll() {
        
    }
}

type FunctionalPage = {
    title: string,
    badge?: string,
    description?: string,
    color?: string,
    stickers: number[],
}


function Pages ({pages} : {pages: FunctionalPage[]}) {
    return <>{
        pages.map((pg, index) => {
            return <Page key={index} page={pg}/>;
        })
    }</>;
}