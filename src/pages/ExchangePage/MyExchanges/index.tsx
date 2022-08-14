import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap, TableContainer, TableCaption, Thead, Th, Table, Tr, Td, Tbody, Badge} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react"
import Card from "../../../components/Card";
import StickerPack from "../../../components/StickerPack";
import { DataContext } from "../../../contexts/DataContext"
import { CompleteCard, CompleteSticker } from "../../../types";
import * as api from "../../../services/services/reqs";
import {CompleteExchangeRequest} from '../../../types';

export default function MyExchanges() {

    const {data: {deck, user, completeAlbum}, hooks: {getDeckData, openPack, openPacks, pasteAllCards}} = useContext(DataContext);

    const [myRequests, setMyRequests] = useState<CompleteExchangeRequest[]>([]);

    useEffect(()=>{
        if (!deck) {
            getDeckData();
        }
        if (myRequests.length === 0) {
            getMyRequests();
        }
    }, [completeAlbum])

    if (!deck || !completeAlbum) {
        return <>nao tem deck ou album</>
    }

    
    
    return <VStack w='100%' align='center'>
        <TableContainer w='100%'>
            <Table variant='simple' size='sm' maxW='100%'>
                <Thead>
                <Tr>
                    <Th>De</Th>
                    <Th>Para</Th>
                    <Th>Oferecidas</Th>
                    <Th>Pedidas</Th>
                    <Th>Status</Th>
                    <Th>Resposta</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {myRequests.map((r) => {
                        return <RequestItem key={r.id} request={r} />
                    })}
                </Tbody>
            </Table>
            </TableContainer>
    </VStack>

    async function getMyRequests () {
        const res = await api.getExchangeRequests();
        console.log(res.data)
        setMyRequests(res.data);
    }

    function RequestItem ({request} : {request: CompleteExchangeRequest}) {
        return <Tr>
            <Td>{request.proposer.name}</Td>
            <Td>{request.requested.name}</Td>
            <Td><Wrap>{request.cardsOffered.map(c=>{
                const available = c.ownerId === request.proposer.id;
                return available ? <Badge key={c.id}>{c.sticker.identifier}</Badge> : <></>
            })}</Wrap></Td>
            <Td><Wrap>{request.cardsRequested.map(c=>{
                const available = c.ownerId === request.requested.id;
                return available ? <Badge key={c.id}>{c.sticker.identifier}</Badge> : <></>
            })}</Wrap></Td>
            <Td>{request.status}</Td>
            <Td>
                <Wrap>
                    {
                        request.proposerId !== user?.id ? <>
                        <Button onClick={()=>{accept(request.id)}} variant='solid' colorScheme='teal' size='sm'>Aceitar</Button>
                        <Button onClick={()=>{reject(request.id)}} variant='solid' colorScheme='red' size='sm'>Recusar</Button>
                        </> :
                        <Button onClick={()=>{cancel(request.id)}} variant='solid' colorScheme='red' size='sm'>Cancelar</Button>
                    }
                </Wrap>
            </Td>
        </Tr>
    }

    async function accept (id: number) {
        await api.acceptRequest(id);
        await getMyRequests();
    }
    async function reject (id: number) {
        await api.rejectRequest(id);
        await getMyRequests();
    }
    async function cancel (id: number) {
        await api.cancelRequest(id);
        await getMyRequests();
    }

}