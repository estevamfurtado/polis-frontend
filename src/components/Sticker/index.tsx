
import { Badge, Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { CompleteSticker, Sticker } from "../../types";
import PoliticianSticker from "../PoliticianSticker";
import PartySticker from "../PartySticker";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";

export default function StickerComponent (
    {stickerId, h, w, open} : {stickerId: number, h?: number, w?: number, open?: boolean}) {

    const {content: {stickers}} = useContext(DataContext);
    const sticker = stickers?.[stickerId] ?? null;

    if (!sticker) {return <></>}

    const type = sticker.type === 'politician' 
    ? <PoliticianSticker sticker={sticker} />
    : <PartySticker sticker={sticker} />

    return <Box 
        w={w ? `${w}px` : '100%'} 
        h={h ? `${h}px` : '100%'}
        flex='0 0 auto'>
        {type}
    </Box>;
}