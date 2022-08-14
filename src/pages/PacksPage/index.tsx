import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap} from "@chakra-ui/react";
import { useContext, useEffect } from "react"
import Card from "../../components/Card";
import StickerPack from "../../components/StickerPack";
import { DataContext } from "../../contexts/DataContext"
import { CompleteCard, CompleteSticker } from "../../types";

export default function PacksPage() {

    const {data: {deck, completeAlbum}, hooks: {getDeckData, openPack, openPacks, pasteAllCards}} = useContext(DataContext);

    useEffect(()=>{
        if (!deck) {
            getDeckData();
        }
    }, [completeAlbum])

    if (!deck || !completeAlbum) {
        return <>nao tem deck ou album</>
    }

    const hasPacksMessage = <>
        <Text>{`Você tem +${deck.packs} pacotes`}</Text>
        <HStack align='start'>
            <Button size='sm' onClick={openOnePack}>Abrir +1</Button>
            <Button size='sm' onClick={openAllPacks}>Abrir todos</Button>
        </HStack>
    </>

    return <Flex w='100%' h='100%' overflowX={'hidden'} direction='column' align='center'>
        <VStack spacing={4} w='100%' py='10' maxW='750px'>
            {packsArea()}
        </VStack>
    </Flex>

    async function openOnePack() {
        console.log('calling handler')
        await openPack();
    }
    async function openAllPacks() {
        await openPacks();
    }

    function packsArea() {
        return <HStack w='100%' py='5' spacing='10' justify='center'>
        <HStack pl='5' flex='0 0 auto' spacing='7'>
            <StickerPack/>

            <VStack align='start' spacing='5'>

                <VStack align='start'>
                {(deck?.packs ?? 0)> 0 ? hasPacksMessage : <></>}
                </VStack>

                <VStack align='start'>
                    <Text>{`Ganhe novos pacotes`}</Text>
                    <HStack align='start'>
                        <Button size='sm'>DepuTinder</Button>
                        <Button size='sm'>SuperPolis</Button>
                    </HStack>
                </VStack>

            </VStack>
        </HStack>
    </HStack>
    }

}