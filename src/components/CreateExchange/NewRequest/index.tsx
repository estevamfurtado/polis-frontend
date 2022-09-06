import { VStack, HStack, Heading, Box, UseToastOptions } from "@chakra-ui/react";
import { useContext } from "react";
import { NewRequestContext } from "../../../contexts/NewRequestContext";
import { MyButton } from "../../Buttons";
import CompareAlbum from "./CompareAlbum";


export default function NewRequest () {

    const {requestedUser, sendRequest, offeredCards, requestedCards} = useContext(NewRequestContext);

    if (!requestedUser) {
        return <></>
    }

    const offer = Object.values(offeredCards).filter(v => v);
    const request = Object.values(requestedCards).filter(v => v);

    const nome = requestedUser.info.username ?? requestedUser.info.email?.split('@')[0] ?? '';

    return <VStack spacing={8} w='100%' align='center' bg='gray.700' py='5' borderRadius='10'>
        <Heading fontSize='md' alignContent={'center'} textAlign='center'>{
            <><>{'Escolha figurinhas para trocar com '}</>
            <Box as='span' p='1' bg='teal' borderRadius='sm'>{nome}</Box>
            </>
        }</Heading>
        <HStack w='100%' spacing='3'>
            <CompareAlbum />
        </HStack>
        <MyButton 
            type='main'
            onClick={sendRequestClick}
            disabled={(offer.length + request.length  === 0)}
        >
            {`Oferecer ${offer.length} por ${request.length}`}
        </MyButton>
    </VStack>
    
    async function sendRequestClick () : Promise<UseToastOptions> {
        try {
            await sendRequest();
            return {
                title: 'Pedido de troca enviado!',
                status: 'success',
                duration: 4000,
                isClosable: true,
            }
        } catch (e) {
            await sendRequest();
            return {
                title: 'Não foi possível :(',
                status: 'error',
                duration: 4000,
                isClosable: true,
            }
        }
    }
}

