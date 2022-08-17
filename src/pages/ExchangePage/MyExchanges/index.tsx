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

    
    // return <VStack w='100%' align='center'>
    //     <TableContainer w='100%'>
    //         <Table variant='simple' size='sm' maxW='100%'>
    //             <Thead>
    //             <Tr>
    //                 <Th>De</Th>
    //                 <Th>Para</Th>
    //                 <Th>Oferecidas</Th>
    //                 <Th>Pedidas</Th>
    //                 <Th>Status</Th>
    //                 <Th>Resposta</Th>
    //             </Tr>
    //             </Thead>
    //             <Tbody>
    //                 {exchangeRequests.map((r) => {
    //                     return <RequestItem key={r.id} request={r} />
    //                 })}
    //             </Tbody>
    //         </Table>
    //         </TableContainer>
    // </VStack>

    // function RequestItem ({request} : {request: CompleteExchangeRequest}) {
    //     return <Tr>
    //         <Td>{request.proposer.name}</Td>
    //         <Td>{request.requested.name}</Td>
    //         <Td><Wrap>{request.cardsOffered.map(c=>{
    //             const available = c.ownerId === request.proposer.id;
    //             return available ? <Badge key={c.id}>{c.sticker.identifier}</Badge> : <></>
    //         })}</Wrap></Td>
    //         <Td><Wrap>{request.cardsRequested.map(c=>{
    //             const available = c.ownerId === request.requested.id;
    //             return available ? <Badge key={c.id}>{c.sticker.identifier}</Badge> : <></>
    //         })}</Wrap></Td>
    //         <Td>{request.status}</Td>
    //         <Td>
    //             <Wrap>
    //                 {
    //                     request.proposerId !== user?.id ? <>
    //                     <Button onClick={()=>{accept(request.id)}} variant='solid' colorScheme='teal' size='sm'>Aceitar</Button>
    //                     <Button onClick={()=>{reject(request.id)}} variant='solid' colorScheme='red' size='sm'>Recusar</Button>
    //                     </> :
    //                     <Button onClick={()=>{cancel(request.id)}} variant='solid' colorScheme='red' size='sm'>Cancelar</Button>
    //                 }
    //             </Wrap>
    //         </Td>
    //     </Tr>
    // }
}

function ExchangeRequest ({request} : {request: CompleteExchangeRequest}) {

    const {auth: {user}, content: {exchangeRequests}, hooks: {accept, cancel, reject}} = useContext(DataContext);

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
                
                <VStack w='100%' align='start'>
                    <Heading as='h3' size='md'>Oferecidas</Heading>
                    <HStack w='100%' spacing={4} overflowX='scroll'>
                        {request.cardsOffered.map(c=>{
                            return <StickerComponent key={c.id} stickerId={c.stickerId} h={150} w={120}/>
                        })}
                    </HStack>
                </VStack>

                <VStack w='100%' align='start'>
                    <Heading as='h3' size='md'>Pedidas</Heading>
                    <HStack w='100%' spacing={4} overflowX='scroll'>
                        {request.cardsRequested.map(c=>{
                            return <StickerComponent key={c.id} stickerId={c.stickerId} h={150} w={120}/>
                        })}
                    </HStack>
                </VStack>

            </VStack>
        </AccordionPanel>
    </AccordionItem>


}