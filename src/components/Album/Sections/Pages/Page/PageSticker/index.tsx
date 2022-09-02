import { WrapItem } from "@chakra-ui/react"
import { useContext } from "react";
import { AlbumContext } from "../../../../../../contexts/AlbumContext";
import { DeckContext } from "../../../../../../contexts/DeckContext";
import Sticker from "../../../../../Sticker"
import EmptySticker from "../EmptySticker"

export default function PageSticker ({stickerId} : {stickerId: number}) {

    const {albumData: {data: {stickers}}} = useContext(AlbumContext);
    const {deckData: {data:{cards}}} = useContext(DeckContext);

    const sticker = stickers?.[stickerId] ?? null;

    if (!sticker) {return <></>}

    const pastedCardId = cards ? cards.bySticker[stickerId]?.pasted[0] ?? null : null
    const toPasteCardId = cards ? cards.bySticker[stickerId]?.notPasted.all[0] ?? null : null
    
    return <WrapItem key={stickerId} w='110px' h='160px'>
        {
            pastedCardId? <Sticker stickerId={stickerId}/> 
                : <EmptySticker sticker={sticker} pasteCardId={toPasteCardId}/>
        }
    </WrapItem>
}