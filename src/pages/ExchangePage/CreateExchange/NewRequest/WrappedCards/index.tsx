import { Wrap, Badge, HStack, Box } from "@chakra-ui/react";
import { useContext } from "react";
import StickerComponent from "../../../../../components/Sticker";


export default function WrappedCards ({cardIds, cardArray, setCardArray} : {cardIds: {id: number, stickerId: number}[], cardArray: number[], setCardArray: (cards: number[]) => void}) {

    return <HStack w='100%' overflow='scroll' spacing='2'>
        {
            cardIds.map(c => {
                const isSelected = cardArray.includes(c.id);
                return <CardInSelector key={c.id} cardId={c.id} stickerId={c.stickerId}/>
            })
        }
    </HStack>

    function CardInSelector ({cardId, stickerId} : {cardId: number, stickerId: number}) {
        
        const isSelected = cardArray.includes(cardId);
        const border = isSelected ? '2px solid #cddefa' : '2px solid #fff';
        const opacity = isSelected ? 1 : 0.5;

        return <Box opacity={opacity} borderRadius={'sm'} onClick={toggleCard} border={border}><StickerComponent stickerId={stickerId}/></Box>

        function toggleCard () {
            
            if (isSelected) {
                setCardArray( cardArray.filter(c => {return c !== cardId}) )
            } else {
                setCardArray([...cardArray, cardId]);
            }
        }
    }

}



