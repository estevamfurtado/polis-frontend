import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap, TableContainer, TableCaption, Thead, Th, Table, Tr, Td, Tbody, Badge, Accordion, AccordionItem, AccordionPanel, AccordionButton, AccordionIcon} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react"
import Card from "../../../components/Card";
import StickerPack from "../../../components/StickerPack";
import { DataContext } from "../../../contexts/DataContext"
import { CompleteCard, CompleteSticker } from "../../../types";
import * as api from "../../../services/reqs";
import {CompleteExchangeRequest} from '../../../types';
import StickerComponent from "../../../components/Sticker";

export default function MyExchanges() {

    const {content: {exchangeRequests}} = useContext(DataContext);

    if (!exchangeRequests) {
        return <></>
    }

    return <Accordion allowMultiple allowToggle>

        {exchangeRequests.map(req => {
            return <ExchangeRequest key={req.id} request={req}/>
        } )}

    </Accordion>
}

function ExchangeRequest ({request} : {request: CompleteExchangeRequest}) {

    const {auth: {user}, hooks: {accept, cancel, reject}} = useContext(DataContext);


    const label = `${request.proposer.name} (${request.cardsOffered.length}) > ${request.requested.name} (${request.cardsRequested.length})`;

    return <AccordionItem>
        <AccordionButton>
            <Box flex='1' textAlign='left'>
                {label}
            </Box>
            <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
            <VStack spacing={4} w='100%'>
                
                <VStack w='100%' align='start'>
                    <Heading as='h3' size='sm'>{`${request.proposer.name} ofereceu`}</Heading>
                    <HStack w='100%' spacing={4} overflowX='scroll'>
                        {request.cardsOffered.map(c=>{
                            return <Box key={c.id} border={'1px solid'} borderColor='gray.200'>
                                <StickerComponent stickerId={c.stickerId} h={130} w={100}/>
                            </Box>
                        })}
                    </HStack>
                </VStack>

                <VStack w='100%' align='start'>
                    <Heading as='h3' size='sm'>{`${request.proposer.name} pediu`}</Heading>
                    <HStack w='100%' spacing={4} overflowX='scroll'>
                        {request.cardsRequested.map(c=>{
                            return <Box key={c.id} border={'1px solid'} borderColor='gray.200'>
                                <StickerComponent stickerId={c.stickerId} h={130} w={100}/>
                            </Box>
                        })}
                    </HStack>
                </VStack>

                <HStack w='100%' spacing={4} justify='end'>
                    {
                        request.proposerId !== user?.id 
                        ? <>
                            <Button onClick={()=>{accept(request.id)}} variant='solid' colorScheme='teal' size='sm'>Aceitar</Button>
                            <Button onClick={()=>{reject(request.id)}} variant='solid' colorScheme='red' size='sm'>Recusar</Button>
                        </>
                        : <Button onClick={()=>{cancel(request.id)}} variant='solid' colorScheme='red' size='sm'>Cancelar</Button>
                    }
                </HStack>

            </VStack>
        </AccordionPanel>
    </AccordionItem>


}