import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap} from "@chakra-ui/react";
import { useContext, useEffect } from "react"
import Card from "../../components/Card";
import StickerPack from "../../components/StickerPack";
import { DataContext } from "../../contexts/DataContext"
import { CompleteCard, CompleteSticker } from "../../types";

export default function PacksPage() {

    const {data: {deck, completeAlbum, user}, hooks: {getDeckData, openPack, openPacks, pasteAllCards}} = useContext(DataContext);

    useEffect(()=>{
        if (!deck) {
            getDeckData();
        }
    }, [completeAlbum])

    if (!deck || !completeAlbum) {
        return <></>
    }

    const hasPacksMessage = <>
        <Text>{`Você tem +${deck.packs} pacotes`}</Text>
        <HStack align='start'>
            <Button size='sm' onClick={openOnePack}>Abrir +1</Button>
            <Button size='sm' onClick={openAllPacks}>Abrir todos</Button>
        </HStack>
    </>

    return <Flex w='100%' h='100%' overflowX={'hidden'} direction='column' align='center'>
        <VStack spacing={4} w='100%' py='10' maxW='750px' align='center'>
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
        return <VStack w='100%' spacing='10' justify='center' align='center'>
        <VStack flex='0 0 auto' spacing='7' align='center'>
            <StickerPack/>

            <VStack align='center' spacing='5'>

                <VStack align='center'>
                {(deck?.packs ?? 0)> 0 ? hasPacksMessage : <Text>Você não tem pacotinhos para abrir :(</Text>}
                </VStack>

                <VStack align='center'>
                    <Text>{`Ganhe novos pacotes`}</Text>
                    <Wrap align='start' w='80%' justify='center'>
                        <Button colorScheme='teal' size='sm' onClick={copyAndSendLink} isDisabled={user ? false : true}>Compartilhe seu link </Button>
                        <Button size='sm' isDisabled={true}>DepuTinder</Button>
                        <Button size='sm' isDisabled={true}>SuperPolis</Button>
                    </Wrap>
                    <Text fontSize={'sm'}>{`ou aguarde - logo logo vc ganha +20`}</Text>
                </VStack>
            </VStack>
        </VStack>
    </VStack>
    }

    function copyAndSendLink() {
        console.log('send link')
        if (user) {
            const link = `Hey, você já ouviu falar do Álbum dos Políticos? Colecione de graça em ${window.location.origin}/referral?id=${user?.id}`
            console.log(link)
            navigator.clipboard.writeText(link);
        }
    }

}