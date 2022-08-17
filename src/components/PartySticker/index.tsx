
import { Badge, Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import { Sticker } from "../../types";

export default function PoliticianSticker({sticker} : {sticker: Sticker}) {

    return <Flex gap={1} 
        direction='column' align='center' justify='center' 
        w='100%' h='100%' bg='white' 
        p='3' borderRadius='md'
        backgroundImage={`url(${'https://cdn.shopify.com/s/files/1/1426/0052/products/silversparkle1212_600x.jpg?v=1618801331'})`}
        backgroundSize='cover'
        backgroundPosition='center'
        backgroundBlendMode={'overlay'}
        backgroundColor={'rgba(255,255,255,0.6)'}
        boxShadow={'sm black'}
    >
        <Image src={sticker.imageUrl} alt={sticker.title}/>
    </Flex>
}
