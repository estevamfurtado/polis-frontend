import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap, Badge, IconButton} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext"
import InStackSection from "../InStackSection";
import ExchangeThumb from "./ExchangeThumb";


export default function MyExchanges() {

    const {content: {exchangeRequests}, hooks: {openPacks}} = useContext(DataContext);
    const navigate = useNavigate();

    return <InStackSection title='Minhas trocas'>
        <Flex  w='100%' h='80px' pl='5' borderRadius={'lg'} align='center' gap={'3'}>
            <Box 
                as='button'
                fontSize='lg'
                fontWeight='bold'
                color='white' 
                bg='#165967'
                boxShadow={'0 3px 0 #13424B'}
                px='4' py='2' borderRadius='lg'
                flex='0 0 auto'
                onClick={()=>{navigate('/exchange/new')}}
            >
                +
            </Box>
            <HStack h='100%' w='3000px' overflow={'scroll'} flex='1 1 auto' pr='5'>
                {exchangeRequests ? exchangeRequests.map(x => <ExchangeThumb request={x}/>) : <></>}
            </HStack>
        </Flex>
    </InStackSection>
}

