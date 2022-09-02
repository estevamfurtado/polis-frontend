import { HStack } from "@chakra-ui/react";
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

    const nextRef = useRef<Element | null>(null)
    const previousRef = useRef<Element | null>(null)

    if (!pageSection) {return <></>}

    return <HStack h='100%'>
        <MyButton
            onClick={onUpClick}
            w='100%'
            h='100%'
        >
            <TriangleUpIcon w={5} h={5}/>
        </MyButton>
        <MyButton
            onClick={onDownClick}
            w='100%'
            h='100%'
        >
            <TriangleDownIcon w={5} h={5}/>
        </MyButton>
    </HStack>

    async function onDownClick() {
        GetElementInView();
        if (nextRef.current) {
            nextRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return null;
    }

    async function onUpClick() {
        GetElementInView();
        if (previousRef.current) {
            previousRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return null;
    }

    function GetElementInView() {
        if (!pageSection.value) {return null}

        const collection = document.getElementsByClassName(pageSection.value);
        const array : Element[] = [].slice.call(collection);

        let i = 0;
        for (const el of array) {
            const isInView = isInViewport(el);
            if (isInView) {

                previousRef.current = array[i - 1] ? array[i - 1] : array[array.length - 1],
                nextRef.current = array[i + 1] ? array[i + 1] : array[0];
                return null;
            }
            i++;
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