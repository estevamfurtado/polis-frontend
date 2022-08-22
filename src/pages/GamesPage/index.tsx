import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap, useToast, Center} from "@chakra-ui/react";
import { useContext, useEffect } from "react"
import Card from "../../components/Card";
import MyPacks from "../../components/MyPacks";
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

    return <VStack spacing={10} w='100%' align='center'>
            <MyPacks showUpdateButton={true}/>
            
            <VStack w='100%' spacing='5' px='5'>
                <GameThumb game={{title: 'SuperDeputado', description: 'Use suas melhores cartas para duelar contra outro usuário. O vencedor ganha 10 pacotes!'}}/>
                <GameThumb game={{title: 'Como vota, deputado?', description: 'Escolha um deputado e acerte como ele votou. Se acertar o suficiente, você ganha 10 pacotes!'}}/>
                <GameThumb game={{title: 'Tinder dos Candidatos', description: 'Veja vídeos curtos dos candidatos do seu Estado à Câmara. A cada 2 vídeos, você ganha 1 pacote.'}}/>
            </VStack>

            <Box 
                as='button'
                fontSize='sm'
                fontWeight='bold'
                color='white' 
                bg='#165967'
                boxShadow={'0 3px 0 #13424B'}
                px='4' py='2' borderRadius='lg'
                onClick={copyAndSendLink}
            >Quero enviar meu link!</Box>

    </VStack>

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

function GameThumb ({game} : {game: {title: string, description: string}}) {
    return <HStack w='100%' h='120px' bg='gray.700' borderRadius='lg' cursor='pointer' boxShadow={'0 3px 0 #222'}>
        <Center w='120px'></Center>
        <VStack flex='1 1 auto' align='start'>
            <Heading fontWeight='black' fontSize='xl'>{game.title}</Heading>
            <Text fontSize='xs' opacity='60%'>{game.description}</Text>
        </VStack>
    </HStack>
}