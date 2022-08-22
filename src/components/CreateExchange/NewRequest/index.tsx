import { Button, VStack, HStack, Heading, Wrap, Badge, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { DataContext } from "../../../contexts/DataContext";
import { GetDeckResponse } from "../../../types";
import * as api from "../../../services/reqs";
import { NewRequestContext } from "../../../contexts/NewRequestContext";
import CompareAlbum from "./CompareAlbum";


type UserInfo = {
    id: number;
    email: string;
    name: string;
}

export default function NewRequest () {

    const {auth: {user}, content: {cards, stickers}} = useContext(DataContext);
    const {requestedUser, sendRequest, offeredCards, requestedCards} = useContext(NewRequestContext);

    if (!cards || !stickers || !user || !requestedUser) {
        return <></>
    }

    const offer = Object.values(offeredCards).filter(v => v);
    const request = Object.values(requestedCards).filter(v => v);

    return <VStack spacing={4} w='100%' align='center' bg='gray.700' py='5' borderRadius='10'>
        <Heading fontSize='xl'>{requestedUser.info.name}</Heading>
        <HStack w='100%' spacing='3'>
            <CompareAlbum />
        </HStack>
        <Button colorScheme='green' onClick={sendRequest} isDisabled={offer.length + request.length  === 0} >Enviar proposta</Button>
    </VStack>
    
}

