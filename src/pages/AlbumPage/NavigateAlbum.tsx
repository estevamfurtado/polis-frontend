import { Badge, HStack } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import Progress from "../../components/Album/Progress";
import {useContext, useRef} from 'react'
import { MyButton } from "../../components/Buttons";
import { CheckIcon, InfoOutlineIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { DeckContext } from "../../contexts/DeckContext";
import { AlbumViewContext } from "../../contexts/AlbumViewContext";



export default function NavigateAlbum () {

    const {mode} = useContext(AlbumViewContext)
    const {deckData: {data: {cards}}} = useContext(DeckContext);

    const showPasteAllCardsButton = (cards?.deck.notPasted.new ?? []).length >= 30;
    const cardsToPaste = (cards?.deck.notPasted.new ?? []).length;

    return <>
        <HStack w='100%' h='100%'>
            <NavigateButtons/>
        </HStack>
        <HStack justify='space-between' w='100%'>
        {mode.value === 'pages' ?
            <>
                <HStack w='100%' h='100%' >
                    <WalkButtons />
                </HStack>
                <HStack h='100%'>
                    {cardsToPaste ? <Badge>{`${cardsToPaste} não coladas`}</Badge> : <></>}
                    {showPasteAllCardsButton ? <PasteButton/> : <></>}
                </HStack> 
            </> : <></>
        }
        </HStack>      
    </>

}

function NavigateButtons() {

    const navigate = useNavigate();
    const location = useLocation();


    return <HStack h='100%'>

        <MyButton h='100%' px='2' onClick={()=>goTo('/album')}>
            <InfoOutlineIcon w={5} h={5}/>
        </MyButton>

        <MyButton h='100%' w='50px' onClick={()=>goTo('/album/stats')}>
            <Progress size='40px' fontSize='10px'/>
        </MyButton>
        
        <MyButton h='100%' w='40px' px='0' onClick={()=>goTo('/album/sections/parties')}>
            P
        </MyButton>
        <MyButton h='100%' w='40px' px='0' onClick={()=>goTo('/album/sections/states')}>
            UF
        </MyButton>
    </HStack>

    async function goTo (to: string) {
        if (location.pathname !== to) {
            navigate(to);
        }
        return null;
    }
}

function PasteButton () {

    const {deckData: {actions: {pasteAllCards}}} = useContext(DeckContext)

    return <HStack h='100%'>
        <MyButton
            type='main'
            onClick={pasteAllCards}
            h='100%'
        >
            <CheckIcon w={5} h={5}/>
        </MyButton>
    </HStack>
}

function WalkButtons () {

    const {pageSection} = useContext(AlbumViewContext)

    if (!pageSection) {return <></>}

    return <HStack h='100%'>
        <MyButton
            onClick={()=>{intoView(-1)}}
            w='100%'
            h='100%'
        >
            <TriangleUpIcon w={5} h={5}/>
        </MyButton>
        <MyButton
            onClick={()=>{intoView(1)}}
            w='100%'
            h='100%'
        >
            <TriangleDownIcon w={5} h={5}/>
        </MyButton>
    </HStack>


    function intoView(step: number) {
        if (!pageSection.value) {return null}

        const collection = document.getElementsByClassName(pageSection.value);
        const size : number = [].slice.call(collection).length;

        let i = 0;
        for (i=0; i<size; i++) {
            const isInView = isInViewport(collection[i]);
            if (isInView) {
                const elIndex = ((i+step) >= size) ? (0)
                    : ((i+step) < 0) ? (size - 1) : (i+step)
                collection[elIndex].scrollIntoView({behavior: 'smooth'})
                return;
            }
        }
        return null;
    }

    function isInViewport(element: Element) {
        const rect = element.getBoundingClientRect();
        const height = window.innerHeight || document.documentElement.clientHeight;

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