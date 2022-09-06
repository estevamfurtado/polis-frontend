import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap, useToast, Center, Badge} from "@chakra-ui/react";
import { useContext, useEffect } from "react"
import { MyButton } from "../../components/Buttons";
import MyPacks from "../../components/MyPacks";
import { AppContext } from "../../contexts/AppContext";
import { DeckContext } from "../../contexts/DeckContext";

export default function PacksPage() {

    const {app: {setSection}} = useContext(AppContext);
    const {deckData: {data: {packs}, actions: {openPack, openPacks}}} = useContext(DeckContext);
    
    const toast = useToast();

    useEffect(() => {
        setSection('games')
        return () => {
            setSection(null)
        };
    },[])

    if (!packs) {return <></>}

    return <VStack spacing={10} w='100%' align='center' py='5'>
            <MyPacks showUpdateButton={true}/>
            

            <VStack w='100%' spacing='5' px='5'>
                <Heading as='h1' fontSize={'lg'} opacity='70%'>Jogue e ganhe novos pacotes!</Heading>

                <GameThumb game={{title: 'SuperDeputado', description: 'Use suas melhores cartas para duelar contra outro usuário. O vencedor ganha 10 pacotes!'}}/>
                <GameThumb game={{title: 'Como vota, deputado?', description: 'Escolha um deputado e acerte como ele votou. Se acertar o suficiente, você ganha 10 pacotes!'}}/>
            </VStack>

            <MyButton type='main' onClick={copyAndSendLink}>
                Quero enviar meu link!
            </MyButton>

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
    
    
    
    return <MyButton w='100%' h='120px' >
        <HStack w='100%' h='100%'>
            {/* <Center w='120px'></Center> */}
            <VStack flex='1 1 auto' align='start'>
                <Badge>EM BREVE</Badge>
                <Heading fontWeight='black' fontSize='xl'>{game.title}</Heading>
                <Text fontSize='xs' textAlign='start' fontWeight='normal' opacity='60%'>{game.description}</Text>
            </VStack>
        </HStack>
    </MyButton>
}