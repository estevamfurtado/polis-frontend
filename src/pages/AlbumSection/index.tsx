import { Badge, HStack, Box, Button, Flex, Grid, GridItem, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, Wrap, WrapItem, Image, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";

export default function AlbumSection () {

    const navigate = useNavigate();

    return <Flex justify='center' align='center' gap='5' h='100%' w='100%'>
        <AlbumThumb/>
        <DeckThumb/>
    </Flex>

    function goToPages () {
        navigate('./pages')
    }
    function goToDeck () {
        navigate('./deck')
    }

    function AlbumThumb () {
        return (
            <Flex
                onClick={goToPages}
                w='300px' h='400px' p='5'
                bg='teal' cursor='pointer' borderRadius='sm' 
                justify='center' align='center' direction='column'
                boxShadow='lg'
            >
                <Heading size='lg' color='white' textAlign='center'>Casa do Baralho</Heading>
                <Heading size='md' color='white' textAlign='center'>2022</Heading>
            </Flex>
        )
    }
    
    function DeckThumb () {
        return (
            <Flex
                onClick={goToDeck}
                w='100px' h='150px' p='5'
                bg='blue.700' cursor='pointer' borderRadius='sm' 
                justify='center' align='center' direction='column'
                boxShadow='lg'
            >
                <Heading size='md' color='white' textAlign='center'>Suas cartas</Heading>
            </Flex>
        )
    }
}

