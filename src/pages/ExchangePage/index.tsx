import { VStack } from "@chakra-ui/react";
import { useContext, useEffect } from "react"
import { DataContext } from "../../contexts/DataContext"
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


    return <VStack w='100%' flex='1 1 auto' gap='10' py='5'>
        <MyExchanges/>
        <Outlet/>
    </VStack>
}