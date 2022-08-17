import { 
    HStack, 
    Box, 
    Button, 
    VStack,
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../contexts/DataContext";

import { RankingContext, RankingProvider } from "../../../contexts/RankingContext";

import { ControleRanking } from "../ControleRanking";
import { ControlePartidos } from "../ControlePartidos";

import PartiesRanking from "../PartiesRanking";
import PoliticiansRanking from "../PoliticiansRanking";




export default function RankingGrid () {
    return <>
        <VStack spacing='0' w='100%' h='100%' justify='start' align-items='center' overflow='hidden'>
            <Box h='50px' w='100%' flex='0 0 auto' bg='gray.100'>
                <ControleRanking/>
            </Box>
            <HStack w='100%' flex='1 1 auto' overflow='hidden' justify='flex-start' align='start' spacing='0'>
                <PoliticiansRanking/>
            </HStack>
        </VStack>
    </>
}



function PartyRankingDrawer({isOpen, onOpen, onClose}: {isOpen: boolean, onOpen: () => void, onClose: () => void}) {
    return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Ranking por Partidos</DrawerHeader>
    
                <DrawerBody>
                    <PartiesRanking/>
                </DrawerBody>
    
                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={onClose}>
                        Fechar
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}