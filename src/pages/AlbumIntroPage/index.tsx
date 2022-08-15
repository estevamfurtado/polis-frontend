import { Badge, HStack, Box, Button, Flex, Grid, GridItem, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, Wrap, WrapItem, Image, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AlbumCover from "../../components/AlbumCover";
import StickerPack from "../../components/StickerPack";
import { DataContext } from "../../contexts/DataContext";

export default function AlbumIntroPage () {

    const navigate = useNavigate();

    return <Flex justify='center' align='center' gap='5' h='100%' w='100%'>
        <AlbumThumb/>
    </Flex>

    function goToPages () {
        navigate('./pages')
    }
    function goToDeck () {
        navigate('./deck')
    }

    function AlbumThumb () {
        return (
            <VStack
                onClick={goToPages}
                cursor='pointer'
            >
                <AlbumCover/>
                <Text>Meu álbum</Text>
            </VStack>
        )
    }
    
    function PackThumb () {
        return (
            <VStack onClick={goToDeck} cursor='pointer'>
                <StickerPack/>
                <Text>Minhas figurinhas</Text>
            </VStack>
        )
    }
}