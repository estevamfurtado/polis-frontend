import { CheckIcon, CloseIcon, StarIcon } from "@chakra-ui/icons";
import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap, Badge, IconButton, Grid, Center} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext"
import { Sticker, CardsCatalog, StickerTypes } from "../../types";
import { CardsWrap } from "../CardsWrap";
import InStackSection from "../InStackSection";
import StickerComponent from "../Sticker";


export function Repeated() {

    const {content: {cards, stickers}, hooks: {openPacks}} = useContext(DataContext);
    const navigate = useNavigate();

    const stickersRow = Object.keys(stickers ?? {});

    return <CardsWrap height='450px' title='Repetidas' button={{title: 'Trocar figurinhas', onClick: () => {navigate('/exchange')}}}>
            {stickersRow.map((sId, index) => {
                const sticker = stickers?.[Number(sId)] ?? null;
                if (!sticker) {return <></>}
                const q = sticker?.cards.notPasted.all.length ?? 0;
                if(!q) {return <></>}
                const hasFavorite = sticker.cards.notPasted.favorites.length > 0; 
                return <StickerInSection hasFavorite={hasFavorite} cardId={sticker.cards.notPasted.all[0]} key={index} sticker={sticker} q={q}/>
            })}
    </CardsWrap>
}

export function New() {

    const {content: {cards, stickers}, hooks: {openPacks}} = useContext(DataContext);
    const navigate = useNavigate();

    const stickersRow = Object.keys(stickers ?? {});

    return <CardsWrap height='130px' title='Novas' button={{title: 'Colar no álbum!', onClick: () => {navigate('/album')}}}>
            {stickersRow.map((sId, index) => {
                const sticker = stickers?.[Number(sId)] ?? null;
                if (!sticker) {return <></>}
                const q = sticker?.cards.notPasted.new.length ?? 0;
                if(!q) {return <></>}
                const hasFavorite = sticker.cards.notPasted.favorites.length > 0; 
                return <StickerInSection hasFavorite={hasFavorite} cardId={sticker.cards.notPasted.new[0]} key={index} sticker={sticker} q={q}/>
            })}
    </CardsWrap>
}

export function Liked() {

    const {content: {cards, stickers}, hooks: {openPacks}} = useContext(DataContext);

    const stickersRow = Object.keys(stickers ?? {});

    return <CardsWrap height='130px' title='⭐ Favoritas'>
            {stickersRow.map((sId, index) => {
                const sticker = stickers?.[Number(sId)] ?? null;
                if (!sticker) {return <></>}
                const q = sticker.cards.notPasted.favorites.length ?? 0;
                if(!q) {return <></>}
                const hasFavorite = sticker.cards.notPasted.favorites.length > 0; 
                return <StickerInSection hasFavorite={hasFavorite} cardId={sticker.cards.notPasted.favorites[0]} key={index} sticker={sticker} q={q}/>
            })}
    </CardsWrap>
}


function StickerInSection({cardId, sticker, q, hasFavorite} : {hasFavorite:boolean, cardId: number, q: number, sticker: (Sticker & {cards: CardsCatalog}) | null}) {
    
    const {hooks: {toggleCard}} = useContext(DataContext);
    
    if (!sticker || q===0) {return <></>}
    return <Box flex='0 0 auto' position='relative'>
        <StickerComponent stickerId={sticker.id} h={120} w={90} />
        
        <HStack position='absolute' bottom='-5px' left='-5px' spacing='0.5'>
            { q > 1
                ? <Center bg='teal' w='20px' h='20px' fontSize='xs' fontWeight='bold' color='white' borderRadius='3'>
                {'x'+q}
            </Center> : <></>}
            <Center 
                bg={hasFavorite ? 'purple.600' : 'gray'} color='white'
                w='20px' h='20px' fontSize='xs' fontWeight='bold'  borderRadius='3'
                onClick={()=>{toggleCard(cardId)}}
                cursor='pointer'
            >
                <StarIcon/>
            </Center>
        </HStack>
        
    </Box>
}