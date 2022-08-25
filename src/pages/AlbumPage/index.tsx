import {  Button, Flex, HStack } from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Progress from "../../components/Album/Progress";
import { AlbumContextProvider, AlbumContext, Mode } from "../../contexts/AlbumContext";
import {useContext, useRef} from 'react'
import { MyButton } from "../../components/Buttons";
import { DataContext } from "../../contexts/DataContext";
import { CheckIcon, HamburgerIcon, InfoOutlineIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";


export default function Album () {
    return <AlbumContextProvider>
        <AlbumView/>
    </AlbumContextProvider>
}

function AlbumView () {

    const {mode, showPasteAllCardsButton, pagesSection} = useContext(AlbumContext)

    return <Flex direction='column' position='relative' w='100%' h='100%' gap='0' overflowY={'hidden'}>
        <Flex direction='column' w='100%' h='100%' gap='0' overflowY={'auto'} flex={'1 1 auto'} >
            <Outlet/>
        </Flex>
        <HStack h='50px' w='100%' align='end' zIndex='10' p='1' justify='space-between'>
            <HStack w='100%' h='100%'>
                <NavigateButtons/>
            </HStack>
            <HStack justify='space-between' w='100%'>
            {mode === Mode.pagesSection ?
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
        </HStack>
    </Flex>

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

    const {hooks: {pasteAllCards}} = useContext(DataContext)

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

    const {pagesSection} = useContext(AlbumContext)
    const nextRef = useRef<Element | null>(null)
    const previousRef = useRef<Element | null>(null)

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
        if (!pagesSection) {return null}

        const collection = document.getElementsByClassName(pagesSection);
        const array : Element[] = [].slice.call(collection);

        let i = 0;
        for (const el of array) {
            const isInView = isInViewport(el);
            if (isInView) {

                previousRef.current = array[i - 1] ? array[i - 1] : array[array.length - 1],
                nextRef.current = array[i + 1] ? array[i + 1] : array[0];
                return null;
                // return {
                //     previous: array[i - 1] ? array[i - 1] : array[array.length - 1],
                //     current: el,
                //     next: array[i + 1] ? array[i + 1] : array[0],
                // }
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