import { Badge, HStack, Box, Button, Flex, Grid, GridItem, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, Wrap, WrapItem, Image } from "@chakra-ui/react";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";

export default function AlbumSection () {

    return <PageBuilder/>

    function PageBuilder () {
        return <>
            <Grid  
                templateAreas={`"page deck"`} 
                gridTemplateRows={`1fr`}
                gridTemplateColumns={`1fr 25%`}
                h='100%'
                overflow='hidden'
            >
                <GridItem bg='orange.500' area={'page'} borderLeft={'1px'} borderColor='gray.200' overflowY={'scroll'}>
                </GridItem>

                <GridItem area={'deck'} overflowY={'scroll'}>
                </GridItem>
            </Grid>
        </>
    }

}