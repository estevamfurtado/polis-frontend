import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { HStack, VStack , Heading, Flex, Badge, IconButton} from "@chakra-ui/react";
import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { DeckContext } from "../../../contexts/DeckContext";
import { CompleteExchangeRequest } from "../../../types";


export default function ExchangeThumb ({request} : {request: CompleteExchangeRequest}) {

    const navigate = useNavigate();

    const {authData: {data:{user}}} = useContext(AuthContext);
    const {deckData: {actions: {accept, reject}}} = useContext(DeckContext);


    const isAuthor = request.proposerId === user?.id;
    const proposer = request.proposer.username ? request.proposer.username
        : (request.proposer.email ? request.proposer.email : 'Alguém');
    const requested = request.requested.username ? request.requested.username.split('@')[0]
        : (request.requested.email ? request.requested.email.split('@')[0] : 'Alguém');

    const title = isAuthor ? requested : proposer;
    const color = isAuthor ? 'gray.600' : 'teal';

    const buttons = <HStack spacing='1' align='center'>
        <IconButton size='sm' aria-label="recusar" fontSize='xs' icon={<CloseIcon/>} onClick={handleReject}/>
        <IconButton aria-label="aceitar" colorScheme="green" onClick={handleAccept}
            icon={<CheckIcon/>}/>
    </HStack>

    const note = <Badge>Esperando</Badge>

    return <VStack h='100%' w='100px' flex='0 0 auto' borderRadius='md' bg={color} p='2' spacing='1' justify='space-between' onClick={()=>{navigate(`/exchange/${request.id}`)}} cursor='pointer'>
        <Heading as='h4' fontSize={'sm'}>{title}</Heading>
        <Flex direction='column' flex='1 1 auto' justify='end'>
            {isAuthor ? note : buttons}
        </Flex>
    </VStack>

    async function handleAccept() {
        
        await accept(request.id);
    }

    async function handleReject() {
        await reject(request.id);
    }

}