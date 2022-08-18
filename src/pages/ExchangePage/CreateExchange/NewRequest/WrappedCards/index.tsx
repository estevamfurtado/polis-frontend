import { Wrap, Badge, HStack, Box } from "@chakra-ui/react";
import { useContext, useState } from "react";
import StickerComponent from "../../../../../components/Sticker";


export default function WrappedCards ({cardIds, setCardArray} : {cardIds: {id: number, stickerId: number}[], setCardArray: (cards: number[]) => void}) {

    return <HStack w='100%' overflow='scroll' spacing='2'>
        {
            cardIds.map(c => {
                return <CardInSelector key={c.id} cardId={c.id} stickerId={c.stickerId} setCardArray={setCardArray}/>
            })
        }
    </HStack>

}

function CardInSelector ({cardId, stickerId, setCardArray} : {cardId: number, stickerId: number, setCardArray: (cards: number[]) => void}) {
        
    const [isSelected, setIsSelected] = useState(false);

    const border = isSelected ? '2px solid #cddefa' : '2px solid #fff';
    const opacity = isSelected ? 1 : 0.5;

    return <Box opacity={opacity} borderRadius={'sm'} onClick={onClick} border={border} flex='0 0 auto' w='120px' h='140px'>
        <StickerComponent stickerId={stickerId}/>
    </Box>

    function onClick () {
        
    }
}