import { VStack } from "@chakra-ui/react";
import { useContext, useEffect } from "react"
import MyExchanges from "../../components/MyExchanges";
import { Outlet } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import { DeckContext } from "../../contexts/DeckContext";


export default function ExchangePage() {

    const {app: {setSection}} = useContext(AppContext);
    const {deckData: {data: {cards}}} = useContext(DeckContext);


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