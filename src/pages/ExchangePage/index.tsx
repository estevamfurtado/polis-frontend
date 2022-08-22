import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap} from "@chakra-ui/react";
import { useContext, useEffect } from "react"
import { DataContext } from "../../contexts/DataContext"
import { NewRequestContextProvider } from "../../contexts/NewRequestContext";
import CreateExchange from "./CreateExchange";
import MyExchanges from "./MyExchanges";


export default function ExchangePage() {

    const {content: {cards}, app: {setSection}} = useContext(DataContext);

    useEffect(() => {
        setSection('exchange')

        return () => {
            setSection(null)
        };
    },[])

    if (!cards) {
        return <></>
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
                    <NewRequestContextProvider>
                        <CreateExchange/>
                    </NewRequestContextProvider>
                </TabPanel>

            </TabPanels>
        </Tabs>
    </VStack>
}