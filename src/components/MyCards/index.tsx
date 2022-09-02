import { Box, HStack, Center} from "@chakra-ui/react";
import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { DeckContext } from "../../contexts/DeckContext";
import { Sticker, CardsCatalog } from "../../types";
import { CardsWrap } from "../CardsWrap";
import StickerComponent from "../Sticker";

function GroupedSticker ({stickerId, cards}:{stickerId: number, cards: number[]}) {
    if (cards.length === 0) {return <></>}
    return <StickerInSection stickerId={stickerId} q={cards.length}/>
}

export function Repeated() {

    const navigate = useNavigate();
    
    const {deckData: {data: {cards}}} = useContext(DeckContext);
    if (!cards) {return <></>}

    const stickersRow = Object.keys(cards.bySticker ?? {});

    return <CardsWrap height='450px' title='Repetidas' button={{title: 'Trocar figurinhas', onClick: () => {navigate('/exchange')}}}>
            {stickersRow.map((sId, index) => {
                const stickerId = Number(sId);
                const sCards = cards.bySticker[stickerId]?.notPasted.new ?? [];
                return <GroupedSticker stickerId={stickerId} key={index} cards={sCards}/>
            })}
    </CardsWrap>
}

export function New() {

    const navigate = useNavigate();
    
    const {deckData: {data: {cards}}} = useContext(DeckContext);
    if (!cards) {return <></>}

    const stickersRow = Object.keys(cards.bySticker ?? {});

    return <CardsWrap height='130px' title='Novas' button={{title: 'Colar no álbum!', onClick: () => {navigate('/album/sections/parties')}}}>
            {stickersRow.map((sId, index) => {
                const stickerId = Number(sId);
                const sCards = cards.bySticker[stickerId]?.notPasted.repeated ?? [];
                return <GroupedSticker stickerId={stickerId} key={index} cards={sCards}/>
            })}
    </CardsWrap>
}

export function Liked() {

    const navigate = useNavigate();
    
    const {deckData: {data: {cards}}} = useContext(DeckContext);
    if (!cards) {return <></>}

    const stickersRow = Object.keys(cards.bySticker ?? {});

    return <CardsWrap height='130px' title='Novas' button={{title: 'Colar no álbum!', onClick: () => {navigate('/album/sections/parties')}}}>
            {stickersRow.map((sId, index) => {
                const stickerId = Number(sId);
                const sCards = cards.bySticker[stickerId]?.notPasted.favorites ?? [];
                return <GroupedSticker stickerId={stickerId} key={index} cards={sCards}/>
            })}
    </CardsWrap>
}


function StickerInSection({stickerId, q, } : {q: number, stickerId: number}) {
        
    return <Box flex='0 0 auto' position='relative'>
        <StickerComponent stickerId={stickerId} h={120} w={90} />
        
        <HStack position='absolute' bottom='-5px' left='-5px' spacing='0.5'>
            { q > 1
                ? <Center bg='teal' w='20px' h='20px' fontSize='xs' fontWeight='bold' color='white' borderRadius='3'>
                {'x'+q}
            </Center> : <></>}

        </HStack>
        
    </Box>
}