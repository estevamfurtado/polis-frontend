import { TriangleUpIcon, TriangleDownIcon, ArrowLeftIcon, ArrowRightIcon, HamburgerIcon, CloseIcon, CopyIcon } from "@chakra-ui/icons";
import { Button, VStack, Flex, Center, HStack, IconButton, Square, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { PropsWithChildren, useContext, useEffect, useRef, useState } from "react"
import AlbumBrief from "../../components/AlbumBrief";
import { GrayButton, MainButton } from "../../components/Buttons";
import { DataContext } from "../../contexts/DataContext"
import Page from "./Page";

export default function AlbumPage () {

    const {content: {pagesByParties, pagesByStates, cards, stickers}, hooks: {pasteAllCards}, app: {setShowAppHeader, setSection}} = useContext(DataContext);

    const [type, setType] = useState<'party' | 'state' | 'stats'>('party');

    const [show, setShow] = useState(true);

    useEffect(() => {
        setShowAppHeader(false);
        setSection('album');

        return () => {
            setShowAppHeader(true);
            setSection(null);
        }
    },[])

    const manyCardsToPaste = (cards?.deck.notPasted.new.length ?? 0) > 30;

    const total = stickers ? Object.keys(stickers).length : 0;
    const pasted = cards ? cards.deck.pasted.length : 0;
    const progressValue = pasted/total;


    return <Flex direction='column' position='relative' w='100%' h='100%' gap='0' overflowY={'hidden'}>

        <Flex direction='column' w='100%' h='100%' gap='0' overflowY={'hidden'} flex={'1 1 auto'} >
            <VStack w='100%' gap='0' overflowY={'scroll'} hidden={type !== 'party'}>            
                <Pages pages={pagesByParties} type={'party-page'}/>
            </VStack>

            <VStack w='100%' gap='0' overflowY={'scroll'} hidden={type !== 'state'}>            
                <Pages pages={pagesByStates} type={'state-page'}/>
            </VStack>

            <VStack w='100%' gap='0' overflowY={'scroll'} hidden={type !== 'stats'}>            
                <AlbumBrief/>
            </VStack>
        </Flex>

        <HStack h='60px' w='100%' align='end' zIndex='10' p='1' justify='space-between'>
            
            <HStack h='100%' bottom='2' left='2' spacing='0' bg='gray.800' borderRadius={'md'} boxShadow='sxl' flex='0 0 auto'>
                <Choice choice='stats'>
                    <AlbumProgress value={progressValue} />
                </Choice>
                <Choice choice='party'>
                    Partidos
                </Choice>
                <Choice choice='state'>
                    Estados
                </Choice>
            </HStack>

            <HStack h='100%'>
                <GrayButton
                    onClick={onUpClick}
                    w='100%'
                    h='50px'
                >
                    <TriangleUpIcon w={5} h={5}/>
                </GrayButton>
                <GrayButton
                    onClick={onDownClick}
                    w='100%'
                    h='50px'
                >
                    <TriangleDownIcon w={5} h={5}/>
                </GrayButton>
            </HStack>

            <HStack h='100%'>

                {manyCardsToPaste ?
                    <MainButton
                        onClick={pasteAllCards}
                        w='100%'
                    >
                        <CopyIcon w={5} h={5}/>
                    </MainButton>
                : <></>}

            </HStack>

        </HStack>

    </Flex>


    
    function Choice({choice, children} : {choice: 'state' | 'party' | 'stats'} & PropsWithChildren) {

        const isSelected = type === choice;

        return <Center
            h='100%'
            p='2'
            bg={isSelected ? 'rgba(255, 255, 255, 0.2)' : ''}
            borderRadius='md'
            fontSize={'12px'}
            fontWeight={'semibold'}
            onClick={onClick}
            cursor='pointer'
            _hover={{bg:'rgba(255, 255, 255, 0.1)'}}
        >
            {children}
        </Center>

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



function AlbumProgress ({value} : {value: number}) {
    return <HStack justify={'center'} align='center' h='100%'>
        <CircularProgress value={value*100} color='blue.400' size='50px' trackColor='gray.700' capIsRound={true}>
            <CircularProgressLabel fontSize='12px'>{
                `${Math.round(value*100)}%`
            }</CircularProgressLabel>
        </CircularProgress>
    </HStack>
}