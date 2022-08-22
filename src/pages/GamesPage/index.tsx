import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap, useToast} from "@chakra-ui/react";
import { useContext, useEffect } from "react"
import Card from "../../components/Card";
import StickerPack from "../../components/StickerPack";
import { DataContext } from "../../contexts/DataContext"
import variables from "../../services/variables";
import { CompleteCard, CompleteSticker } from "../../types";

export default function PacksPage() {

    const {content: {packs}, hooks: {openPack, openPacks}, app: {setSection}} = useContext(DataContext);
    const toast = useToast();


    useEffect(() => {
        setSection('games')
        return () => {
            setSection(null)
        };
    },[])

    if (!packs) {return <></>}

    const hasPacksMessage = <>
        <Text>{`Você tem +${packs.new} pacotes`}</Text>
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
        await openPack();
    }
    async function openAllPacks() {
        await openPacks();
    }

    function packsArea() {

        if (!packs) {return <></>}

        const nextPack = packs.lastPackAt + 60*60*1000*variables.back.SIGN_IN_FREE_CARDS_HOURS;
        const nextPackDate = new Date(nextPack);
        const nextPackTime = nextPackDate.toLocaleTimeString();

        return <VStack w='100%' spacing='10' justify='center' align='center'>
        <VStack flex='0 0 auto' spacing='7' align='center'>
            <StickerPack/>
            <VStack align='center' spacing='5'>
                <VStack align='center'>
                {(packs?.new ?? 0)> 0 ? hasPacksMessage : <Text>Você não tem pacotinhos para abrir :(</Text>}
                </VStack>

                <VStack align='center'>
                    <Text>{`Ganhe novos pacotes`}</Text>
                    <Wrap align='start' w='80%' justify='center'>
                        <Button colorScheme='teal' size='sm' onClick={copyAndSendLink}>Compartilhe seu link </Button>
                        <Button size='sm' isDisabled={true}>DepuTinder</Button>
                        <Button size='sm' isDisabled={true}>SuperPolis</Button>
                    </Wrap>
                    <Text fontSize={'sm'}>{`Seu próximo pacote será liberado às ${nextPackTime}`}</Text>
                </VStack>
            </VStack>
        </VStack>
    </VStack>
    }

    function copyAndSendLink() {
        if (packs) {
            const link = `Hey, você já ouviu falar do Álbum dos Políticos? Colecione de graça em ${window.location.origin}/referral?id=${packs.link}`
            navigator.clipboard.writeText(link);

            toast({
                title: 'Link copiado',
                description: 'Compartilhe seu link com seus amigos',
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'bottom',
            });
        }
    }

}