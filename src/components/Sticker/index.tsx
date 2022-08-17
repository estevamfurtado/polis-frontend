
import { Badge, Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { CompleteSticker, Sticker } from "../../types";
import PoliticianSticker from "../PoliticianSticker";
import PartySticker from "../PartySticker";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";

export default function StickerComponent ({stickerId, h, w} : {stickerId: number, h?: number, w?: number}) {

    const {content: {stickers}} = useContext(DataContext);
    const sticker = stickers?.[stickerId] ?? null;

    if (!sticker) {return <></>}

    const type = sticker.type === 'politician' 
    ? <PoliticianSticker sticker={sticker} />
    : <PartySticker sticker={sticker} />

    return <Box 
        w={w ? `${w}px` : '150px'} 
        h={h ? `${h}px` : '200px'}
        flex='0 0 auto'>
        {type}
    </Box>;
}