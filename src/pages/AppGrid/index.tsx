import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import {DataContext} from "../../contexts/DataContext";



export default function AppGrid() {

    return (
        <Grid templateAreas={`"header" "main"`} 
                gridTemplateRows={'50px 1fr'}
                gridTemplateColumns={'1fr'}
                h='100%'
                overflow='hidden'
                w='100%'
        >
            <GridItem area={'header'} borderBottom={'1px'} borderColor='gray.200'>
                <Header/>
            </GridItem>
            <GridItem area={'main'} overflowY={'scroll'}>
                <Outlet/>
            </GridItem>
        </Grid>
    )
}