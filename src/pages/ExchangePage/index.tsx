import { Box, HStack, VStack , Text, Button, Heading, Flex, Tab, Tabs, TabList, TabPanels, TabPanel, Wrap} from "@chakra-ui/react";
import { useContext, useEffect } from "react"
import MyPacks from "../../components/MyPacks";
import { DataContext } from "../../contexts/DataContext"
import { NewRequestContextProvider } from "../../contexts/NewRequestContext";
import CreateExchange from "../../components/CreateExchange";
import ViewExchange from "../../components/ViewExchange";
import MyExchanges from "../../components/MyExchanges";
import { Outlet } from "react-router-dom";


export default function ExchangePage() {

    const {content: {cards}, app: {setSection}} = useContext(DataContext);

    useEffect(() => {
        setSection('exchange')

        return () => {
            setSection(null)
        };
    },[])


    return <VStack w='100%' flex='1 1 auto' gap='10'>
        <MyExchanges/>
        <Outlet/>
    </VStack>
}