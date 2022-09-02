import { Box, HStack, Flex} from "@chakra-ui/react";
import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { DeckContext } from "../../contexts/DeckContext";
import { MyButton } from "../Buttons";
import InStackSection from "../InStackSection";
import ExchangeThumb from "./ExchangeThumb";


export default function MyExchanges() {

    const {deckData: {data: {exchangeRequests}}} = useContext(DeckContext);
    const navigate = useNavigate();

    return <InStackSection title='Minhas trocas'>
        <Flex  w='100%' h='100px' pl='5' borderRadius={'lg'} align='center' gap={'3'} justify='space-between'>
            <MyButton type='main' onClick={()=>{navigate('/exchange/new')}}>+ Criar troca</MyButton>
            <HStack h='100%' w='3000px' overflow={'scroll'} flex='1 1 auto' pr='5'>
                {exchangeRequests ? exchangeRequests.map((x, index) => <ExchangeThumb key={index} request={x}/>) : <></>}
            </HStack>
        </Flex>
    </InStackSection>
}

