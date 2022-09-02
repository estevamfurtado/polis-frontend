
import { Box } from "@chakra-ui/react";
import PoliticianSticker from "../PoliticianSticker";
import PartySticker from "../PartySticker";
import { useContext } from "react";
import { AlbumContext } from "../../contexts/AlbumContext";

export default function StickerComponent (
    {stickerId, h, w, dontOpen} : {stickerId: number, h?: number, w?: number, dontOpen?: boolean}) {

    const {albumData: {data: {stickers}}} = useContext(AlbumContext);
    const sticker = stickers?.[stickerId] ?? null;

    if (!sticker) {return <></>}

    const type = sticker.type === 'politician' 
    ? <PoliticianSticker sticker={sticker} dontOpen={dontOpen} />
    : <PartySticker sticker={sticker} />

    return <Box 
        w={w ? `${w}px` : '100%'} 
        h={h ? `${h}px` : '100%'}
        flex='0 0 auto'>
        {type}
    </Box>;
}