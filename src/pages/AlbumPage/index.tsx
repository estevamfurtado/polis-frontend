import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Button, VStack, Flex, Center, HStack, IconButton } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react"
import { forEachChild } from "typescript";
import { DataContext } from "../../contexts/DataContext"
import Page from "./Page";

export default function AlbumPage () {

    const {content: {pagesByParties, pagesByStates, cards}, hooks: {pasteAllCards}, app: {setShowAppHeader, setSection}} = useContext(DataContext);

    const [type, setType] = useState<'party' | 'state' | 'stats'>('party');

    useEffect(() => {
        setShowAppHeader(false);
        setSection('album');

        return () => {
            setShowAppHeader(true);
            setSection(null);
        }
    },[])

    const manyCardsToPaste = (cards?.deck.notPasted.new.length ?? 0) > 30;

    const button = manyCardsToPaste ? <Button
        size='sm' bg='rgba(0,0,0,0.5)' color={'white'}
        position='absolute' top='3' right='5' zIndex={10}
        onClick={pasteAllCards}>Colar todas as cartas
    </Button> : <></>;

    return <Flex direction='column' position='relative' w='100%' h='100%' gap='0' overflowY={'hidden'}>

        <VStack w='100%' gap='0' overflowY={'scroll'} flex='1 1 auto' py='3' hidden={type !== 'party'}>            
            <Pages pages={pagesByParties} type={'party-page'}/>
        </VStack>

        <VStack w='100%' gap='0' overflowY={'scroll'} flex='1 1 auto' py='3' hidden={type !== 'state'}>            
            <Pages pages={pagesByStates} type={'state-page'}/>
        </VStack>

        <HStack position='absolute' bottom='2' left='2' spacing='0' bg='gray.800' borderRadius={'md'} boxShadow='sxl'>
            <Choice title='Meu álbum' choice='stats'/>
            <Choice title='Partidos' choice='party'/>
            <Choice title='Estados' choice='state'/>
        </HStack>

        <VStack position='absolute' bottom='25vh' right='2'>
            <IconButton aria-label="up" bg='rgba(0,0,0,0.5)' icon={<TriangleUpIcon/>} onClick={onUpClick}/>
            <IconButton aria-label="down" bg='rgba(0,0,0,0.5)' icon={<TriangleDownIcon/>} onClick={onDownClick}/>
        </VStack>

        <VStack position='absolute' top='1' right='2'>
            {button}
        </VStack>

    </Flex>


    function Footer() {
        return <Center w='100%' h='50px' bg='gray.700' flex='0 0 auto' p='3'>
            <HStack justify={'space-between'} w='100%' h='100%'>
                
                
            </HStack>
        </Center>
    }
    
    function Choice({title, choice} : {title: string, choice: 'state' | 'party' | 'stats'}) {

        const isSelected = type === choice;

        return <Button h='10' variant={isSelected ? 'solid' : 'ghost'} size='sm' onClick={onClick}>
            {title}
        </Button>

        function onClick() {
            setType(choice);
        }
    }

    function onDownClick() {
        const element = GetElementInView();
        if (element && element.next) {
            element.next.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function onUpClick() {
        const element = GetElementInView();
        if (element && element.previous) {
            element.previous.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }


    function GetElementInView() {

        const classType = (type === 'party') ? 'party-page' : 'state-page';
        const collection = document.getElementsByClassName(classType);

        const array : Element[] = [].slice.call(collection);

        let i = 0;

        for (const el of array) {

            const isInView = isInViewport(el);

            if (isInView) {
                return {
                    previous: array[i - 1] ? array[i - 1] : null,
                    current: el,
                    next: array[i + 1] ? array[i + 1] : null,
                }
            }
            i++;
        }

        return null;
    }

    function isInViewport(element: Element) {
        const rect = element.getBoundingClientRect();
        const height = window.innerHeight || document.documentElement.clientHeight;
        const width = window.innerWidth || document.documentElement.clientWidth

        const top = rect.top < 0 ? 0
            : rect.top > height ? height : rect.top;

        const bottom = rect.bottom > height ? height
            : rect.bottom < 0 ? 0 : rect.bottom;

        const spaceInView = (bottom - top);
        const shareOfView = spaceInView / (height);
        const shareOfComponent = spaceInView / (rect.bottom - rect.top);

        return (
            shareOfView >= 0.5 || shareOfComponent >= 0.9
        );
    }

}

type FunctionalPage = {
    title: string,
    badge?: string,
    description?: string,
    color?: string,
    stickers: number[],
}


function Pages ({pages, type} : {pages: FunctionalPage[], type: string}) {
    return <>{
        pages.map((pg, index) => {
            return <Page key={index} page={pg} classType={type}/>;
        })
    }</>;
}