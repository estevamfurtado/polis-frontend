import {  Flex, HStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavigateAlbum from "./NavigateAlbum";


export default function Album () {
    return <Flex direction='column' position='relative' w='100%' h='100%' gap='0' overflowY={'hidden'}>
        <Flex direction='column' w='100%' h='100%' gap='0' overflowY={'auto'} flex={'1 1 auto'} >
            <Outlet/>
        </Flex>
        <HStack h='50px' w='100%' align='end' zIndex='10' p='1' justify='space-between'>
            <NavigateAlbum/>
        </HStack>
    </Flex>
}