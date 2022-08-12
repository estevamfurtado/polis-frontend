
import { Badge, Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { CompleteSticker } from "../../types";
import PoliticianSticker from "../PoliticianSticker";
import PartySticker from "../PartySticker";

export default function Sticker({sticker} : {sticker: CompleteSticker}) {

    const type = sticker.type === 'politician' 
    ? <PoliticianSticker sticker={sticker} />
    : <PartySticker sticker={sticker} />

    return <Box w='150px' h='200px'>
        {type}
    </Box>;
}