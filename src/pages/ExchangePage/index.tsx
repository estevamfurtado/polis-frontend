import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap} from "@chakra-ui/react";
import { useContext, useEffect } from "react"
import Card from "../../components/Card";
import StickerPack from "../../components/StickerPack";
import { DataContext } from "../../contexts/DataContext"
import { CompleteCard, CompleteSticker } from "../../types";
import CreateExchange from "./CreateExchange";
import MyExchanges from "./MyExchanges";



export default function ExchangePage() {

    const {data: {deck, completeAlbum}, hooks: {getDeckData, openPack, openPacks, pasteAllCards}} = useContext(DataContext);

    useEffect(()=>{
        if (!deck) {
            getDeckData();
        }
    }, [completeAlbum])

    if (!deck || !completeAlbum) {
        return <>nao tem deck ou album</>
    }

    return <VStack w='100%' align='center' flex='1 1 auto' overflow='scroll'>
        <Tabs w='100%' maxW='750px' variant='enclosed' borderColor='gray.200' size='sm' pt='5' isLazy>
            <TabList w='yellow'>
                <Tab fontWeight={'semibold'}>{`Minhas Trocas`}</Tab>
                <Tab fontWeight={'semibold'}>{`Procurar`}</Tab>
            </TabList>

            <TabPanels w='100%' minH='500px'>
                
                <TabPanel w='100%'>
                    <MyExchanges/>
                </TabPanel>
                <TabPanel w='100%'>
                    <CreateExchange/>
                </TabPanel>

            </TabPanels>
        </Tabs>
    </VStack>
}