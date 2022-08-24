import { VStack } from "@chakra-ui/react";
import { useContext, useEffect } from "react"
import { DataContext } from "../../contexts/DataContext"
import {Repeated, New } from "../../components/MyCards";
import MyPacks from "../../components/MyPacks";


export default function StickersPage() {

    const {app: {setSection}} = useContext(DataContext);

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