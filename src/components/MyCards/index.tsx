import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap, Badge, IconButton, Grid, Center} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext"
import { Sticker, CardsCatalog } from "../../types";
import { CardsWrap } from "../CardsWrap";
import InStackSection from "../InStackSection";
import StickerComponent from "../Sticker";


export function Repeated() {

    const {content: {cards, stickers}, hooks: {openPacks}} = useContext(DataContext);
    const navigate = useNavigate();

    const stickersRow = Object.keys(stickers ?? {});

    return <CardsWrap height='300px' title='Repetidas' button={{title: 'Trocar figurinhas', onClick: () => {navigate('/exchange')}}}>
            {stickersRow.map(sId => {
                const sticker = stickers?.[Number(sId)] ?? null;
                const q = sticker?.cards.notPasted.all.length ?? 0;
                return <StickerInSection sticker={sticker} q={q}/>
            })}
    </CardsWrap>
}

export function New() {

    const {content: {cards, stickers}, hooks: {openPacks}} = useContext(DataContext);
    const navigate = useNavigate();

    const stickersRow = Object.keys(stickers ?? {});

    return <CardsWrap height='130px' title='Novas' button={{title: 'Colar no álbum!', onClick: () => {navigate('/album')}}}>
            {stickersRow.map(sId => {
                const sticker = stickers?.[Number(sId)] ?? null;
                const q = sticker?.cards.notPasted.new.length ?? 0;
                return <StickerInSection sticker={sticker} q={q}/>
            })}
    </CardsWrap>
}


function StickerInSection({sticker, q} : {q: number, sticker: (Sticker & {cards: CardsCatalog}) | null}) {
    if (!sticker || q===0) {return <></>}
    return <Box flex='0 0 auto' position='relative'>
        <StickerComponent stickerId={sticker.id} h={120} w={90} />
        { q > 1
            ? <Center position='absolute' bottom='-5px' left='-5px' bg='teal' w='20px' h='20px' fontSize='xs' fontWeight='bold' color='white' borderRadius='3'>
            {'x'+q}
        </Center> : <></>}
    </Box>
}