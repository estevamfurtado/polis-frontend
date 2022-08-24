import { Button, VStack, HStack, Heading, Box, useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { DataContext } from "../../../contexts/DataContext";
import { NewRequestContext } from "../../../contexts/NewRequestContext";
import { MainButton } from "../../Buttons";
import CompareAlbum from "./CompareAlbum";


type UserInfo = {
    id: number;
    email: string;
    name: string;
}

export default function NewRequest () {

    const {auth: {user}, content: {cards, stickers}} = useContext(DataContext);
    const {requestedUser, sendRequest, offeredCards, requestedCards} = useContext(NewRequestContext);

    const toast = useToast();

    if (!cards || !stickers || !user || !requestedUser) {
        return <></>
    }

    const offer = Object.values(offeredCards).filter(v => v);
    const request = Object.values(requestedCards).filter(v => v);

    const nome = requestedUser.info.name.split(' ')[0];

    return <VStack spacing={8} w='100%' align='center' bg='gray.700' py='5' borderRadius='10'>
        <Heading fontSize='md'>{
            <><>{'Escolha figurinhas para trocar com '}</>
            <Box as='span' p='1' bg='teal' borderRadius='sm'>{nome}</Box>
            </>
        }</Heading>
        <HStack w='100%' spacing='3'>
            <CompareAlbum />
        </HStack>
        <MainButton 
            onClick={sendRequestClick}
            disabled={(offer.length + request.length  === 0)}
        >
            Enviar proposta
        </MainButton>
    </VStack>
    
    async function sendRequestClick () {
        try {
            await sendRequest();
            toast({
                title: 'Pedido de troca enviado!',
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
        } catch (e) {
            await sendRequest();
            toast({
                title: 'Não foi possível :(',
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
    }
}

