import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap, Input, Badge} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../contexts/DataContext"
import { MyDeck, CompleteSticker, GetDeckResponse } from "../../types";
import * as api from "../../services/reqs";
import Search from "./Search";
import NewRequest from "./NewRequest";
import { NewRequestContextProvider } from "../../contexts/NewRequestContext";


type UserInfo = {
    id: number;
    email: string;
    name: string;
}


export default function CreateExchange() {

    const {content: {cards, stickers, pages}, hooks: {openPack, openPacks, pasteAllCards}} = useContext(DataContext);

    if (!cards || !stickers || !pages) {
        return <></>
    }

    return <NewRequestContextProvider>
        <VStack w='100%' spacing='5'>
            <Heading size='md'>Trocar com...</Heading>
            <Search/>
            <NewRequest/>
        </VStack>
    </NewRequestContextProvider>
}

