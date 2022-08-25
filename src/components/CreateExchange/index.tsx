import {  VStack , Heading, } from "@chakra-ui/react";
import { useContext, } from "react"
import { DataContext } from "../../contexts/DataContext"
import Search from "./Search";
import NewRequest from "./NewRequest";
import { NewRequestContextProvider } from "../../contexts/NewRequestContext";



export default function CreateExchange() {

    const {content: {cards, stickers, pages}} = useContext(DataContext);

    if (!cards || !stickers || !pages) {
        return <></>
    }

    return <NewRequestContextProvider>
        <VStack w='100%' spacing='5'>
            <Heading size='md'>Criar proposta</Heading>
            <Search/>
            <NewRequest/>
        </VStack>
    </NewRequestContextProvider>
}

