import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap, Badge, IconButton, useToast} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext"
import variables from "../../services/variables";


export default function MyPacks({showUpdateButton} : {showUpdateButton?: boolean}) {

    const {content: {packs}, hooks: {openPacks}} = useContext(DataContext);
    const [openIsLoading, setOpenIsLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const nextPack = packs ? packs.lastPackAt + 60*60*1000*variables.back.SIGN_IN_FREE_CARDS_HOURS : 0;
    const nextPackDate = new Date(nextPack);
    const nextPackTime = nextPackDate.toLocaleTimeString();
    const nextPackMessage = nextPack > 0 ? <Text opacity='75%'>{`Seu próximo pacotinho será liberado ${nextPackTime}`}</Text> : <></>

    return <VStack align='center' textAlign={'center'} p='5' spacing='3' w='100%'>
        <Heading fontSize={'md'}>{packs?.new ? `Você tem ${packs.new} pacotinhos novos!` : 'Você não tem pacotinhos :('}</Heading>
        {nextPackMessage}
        <Box 
            as='button'
            fontSize='sm'
            fontWeight='bold'
            color='white' 
            bg='#165967'
            boxShadow={'0 3px 0 #13424B'}
            px='4' py='2' borderRadius='lg'
            onClick={
                packs?.new ? onClickOpen : 
                showUpdateButton ? ()=>{} : () => {navigate('/games')
            }}
            disabled={openIsLoading}
        >
            {packs?.new ? (openIsLoading ? 'Abrindo...' : 'Abrir todos') : (showUpdateButton ? 'Pegar meus pacotes' : 'Ganhar mais!')}
        </Box>

    </VStack>

    async function onClickOpen () {
        try {
            console.log('abrindo pacotes')
            setOpenIsLoading(true);
            await openPacks();
            setOpenIsLoading(false);
        } catch (e) {
            setOpenIsLoading(false);
        }
    }

}