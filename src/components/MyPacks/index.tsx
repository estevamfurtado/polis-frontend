import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap, Badge, IconButton} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext"


export default function MyPacks() {

    const {content: {packs}, hooks: {openPacks}} = useContext(DataContext);
    const [openIsLoading, setOpenIsLoading] = useState(false);
    const navigate = useNavigate();

    return <VStack align='center' textAlign={'center'} p='5' spacing='3' w='100%'>
        <Heading fontSize={'md'}>{packs?.new ? `Você tem ${packs.new} pacotinhos novos!` : 'Você não tem pacotinhos :('}</Heading>
        <Box 
            as='button'
            fontSize='sm'
            fontWeight='bold'
            color='white' 
            bg='#165967'
            boxShadow={'0 3px 0 #13424B'}
            px='4' py='2' borderRadius='lg'
            onClick={packs?.new ? onClickOpen : () => {navigate('/games')}}
            disabled={openIsLoading}
        >
            {packs?.new ? (openIsLoading ? 'Abrindo...' : 'Abrir todos') : 'Ganhar mais!'}
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