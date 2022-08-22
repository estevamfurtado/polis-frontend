import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap, Badge, IconButton} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../contexts/DataContext"
import { CompleteExchangeRequest } from "../../../types";


export default function ExchangeThumb ({request} : {request: CompleteExchangeRequest}) {

    const {auth: {user}, hooks: {openPacks}, app: {setSection}} = useContext(DataContext);
    const navigate = useNavigate();

    const isAuthor = request.proposerId === user?.id;

    const title = isAuthor ? request.requested.name.split(' ')[0] : request.proposer.name.split(' ')[0]
    const color = isAuthor ? 'gray.600' : 'teal';
    const willReceive = isAuthor ? request.cardsRequested.length : request.cardsOffered.length;
    const willGive = isAuthor ? request.cardsRequested.length : request.cardsOffered.length;

    const buttons = <HStack spacing='1' align='center'>
        <IconButton size='sm' aria-label="recusar" fontSize='xs' icon={<CloseIcon/>}/>
        <IconButton aria-label="aceitar" colorScheme="green"
            icon={<CheckIcon/>}/>
    </HStack>

    const note = <Badge>Esperando</Badge>

    return <VStack h='100%' w='100px' flex='0 0 auto' borderRadius='md' bg={color} p='2' spacing='1' justify='space-between' onClick={()=>{navigate(`/exchange/${request.id}`)}}>
        <Heading as='h4' fontSize={'sm'}>{title}</Heading>
        <Flex direction='column' flex='1 1 auto' justify='center'>
            {isAuthor ? note : buttons}
        </Flex>
    </VStack>
}