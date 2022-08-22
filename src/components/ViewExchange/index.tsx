import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap, TableContainer, TableCaption, Thead, Th, Table, Tr, Td, Tbody, Badge, Accordion, AccordionItem, AccordionPanel, AccordionButton, AccordionIcon} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react"
import Card from "../Card";
import StickerPack from "../StickerPack";
import { DataContext } from "../../contexts/DataContext"
import { CompleteCard, CompleteSticker } from "../../types";
import * as api from "../../services/reqs";
import {CompleteExchangeRequest} from '../../types';
import StickerComponent from "../Sticker";
import { useParams } from 'react-router-dom';
import { CardsWrap } from "../CardsWrap";



export default function ViewExchanges () {

    const {auth: {user}, content: {exchangeRequests},  hooks: {accept, cancel, reject}} = useContext(DataContext);

    const { requestId } = useParams()


    const idNum = Number(requestId)
    const request = exchangeRequests?.find(x => x.id === idNum) ?? null;
    
    if (!user || !requestId || !request) {return <></>}

    const isAuthor = user?.id === request.proposerId;
    const wasRequested = user?.id === request.requestedId;

    if (!isAuthor && !wasRequested) {return <></>}
    const author = isAuthor ? 'Você' : request.proposer.name;
    const requested = isAuthor ? request.requested.name : 'você'

    const label = `${author} para ${requested}`;

    return <VStack spacing={4} w='100%' align='center' bg='gray.700' py='5' borderRadius='10'>

        <Heading size='md'>
            {label}
        </Heading>

        <CardsWrap title={`${author} oferece ${request.cardsOffered.length}`} height='150px'>
            {request.cardsOffered.map(c=>{
                return <StickerComponent stickerId={c.stickerId} h={120} w={90}/>
            })}
        </CardsWrap>

        <CardsWrap title={`${author} pede ${request.cardsRequested.length}`} height='150px'>
            {request.cardsRequested.map(c=>{
                return <StickerComponent stickerId={c.stickerId} h={130} w={100}/>
            })}
        </CardsWrap>

        <HStack w='100%' spacing={4} justify='center'>
            {
                request.proposerId !== user?.id 
                ? <>
                    <Button onClick={()=>{reject(request.id)}} variant='solid' colorScheme='red' size='md'>Recusar</Button>
                    <Button onClick={()=>{accept(request.id)}} variant='solid' colorScheme='green' size='lg'>Aceitar</Button>
                </>
                : <Button onClick={()=>{cancel(request.id)}} variant='solid' colorScheme='red' size='sm'>Cancelar proposta</Button>
            }
        </HStack>

    </VStack>

}