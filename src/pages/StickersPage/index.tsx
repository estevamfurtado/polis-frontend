import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap, Badge, IconButton} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext"
import AlbumBrief from "../../components/AlbumBrief";
import { CompleteExchangeRequest } from "../../types";
import CardInDeckPage from "./CardInDeckPage";
import MyExchanges from "../../components/MyExchanges";
import {Repeated, New} from "../../components/MyCards";
import MyPacks from "../../components/MyPacks";


export default function DeckPage() {

    const {app: {setSection}} = useContext(DataContext);

    useEffect(() => {
        setSection('stickers')
        return () => {
            setSection(null)
        };
    },[])

    return <VStack spacing={'12'} w='100%'>
        <VStack spacing={'3'} w='100%'>
            <MyPacks />
            <MyExchanges />
        </VStack>
        <New/>
        <Repeated/>
    </VStack>
}