import { VStack } from "@chakra-ui/react";
import { useContext, useEffect } from "react"
import {Repeated, New } from "../../components/MyCards";
import MyPacks from "../../components/MyPacks";
import { AppContext } from "../../contexts/AppContext";


export default function StickersPage() {

    const {app: {setSection}} = useContext(AppContext);

    useEffect(() => {
        setSection('stickers')
        return () => {
            setSection(null)
        };
    },[])

    return <VStack spacing={'12'} w='100%' py='5'>
        <VStack spacing={'3'} w='100%'>
            <MyPacks />
        </VStack>
        <New/>
        <Repeated/>
    </VStack>
}