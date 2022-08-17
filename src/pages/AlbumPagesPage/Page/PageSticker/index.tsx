import { WrapItem } from "@chakra-ui/react"
import { useContext } from "react";
import Sticker from "../../../../components/Sticker"
import { DataContext } from "../../../../contexts/DataContext";
import EmptySticker from "../EmptySticker"

export default function PageSticker ({stickerId} : {stickerId: number}) {

    const {content: {stickers}} = useContext(DataContext);

    const sticker = stickers?.[stickerId] ?? null;
    
    if (!sticker) {return <></>}
    
    return <WrapItem key={stickerId} w='150px' h='200px'>
        {sticker.cards.pasted.length > 0 
            ? <Sticker stickerId={stickerId}/> 
            : <EmptySticker sticker={sticker} 
        />}
    </WrapItem>
}