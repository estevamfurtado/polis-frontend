import {  VStack , Heading, } from "@chakra-ui/react";
import Search from "./Search";
import NewRequest from "./NewRequest";
import { NewRequestContextProvider } from "../../contexts/NewRequestContext";



export default function CreateExchange() {

    return <NewRequestContextProvider>
        <VStack w='100%' spacing='5'>
            <Heading size='md'>Criar proposta</Heading>
            <Search/>
            <NewRequest/>
        </VStack>
    </NewRequestContextProvider>
}

