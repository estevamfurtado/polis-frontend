import { Wrap, Badge, HStack, Box } from "@chakra-ui/react";
import { useContext, useRef, useState } from "react";
import StickerComponent from "../../../../../components/Sticker";


export default function WrappedCards ({cardIds, cardArray, setCardArray} : {cardIds: {id: number, stickerId: number}[], cardArray: number[], setCardArray: (cards: number[]) => void}) {

    return <HStack w='100%' overflow='scroll' spacing='2'>
        {
            cardIds.map(c => {
                return <CardInSelector key={c.id} cardId={c.id} stickerId={c.stickerId}/>
            })
        }
    </HStack>


    function CardInSelector ({cardId, stickerId} : {cardId: number, stickerId: number}) {
        
        const isSelected = cardArray.filter(c => c === cardId).length > 0;
        const opacity = isSelected ? 1 : 0.5;

        return <Box 
            opacity={opacity} 
            borderRadius={'sm'}
            position='relative' border={'1px solid'} borderColor='gray.300' flex='0 0 auto' w='120px' h='140px'>       
            
            <StickerComponent stickerId={stickerId}/>
            <Box onClick={onClick} position='absolute' 
                top='0' bottom='0' right='0' left='0' />
    
        </Box>

        function onClick () {
            if (isSelected) {
                setCardArray(cardArray.filter(c => c !== cardId));
            } else {
                setCardArray([...cardArray, cardId]);
            }
        }
    }


}

