import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap, Badge, IconButton} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../contexts/DataContext"
import {Repeated, New, Liked} from "../../components/MyCards";
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
        </VStack>
        <New/>
        <Repeated/>
        <Liked/>
    </VStack>
}