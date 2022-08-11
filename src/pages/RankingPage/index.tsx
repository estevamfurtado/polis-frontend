import { Badge, HStack, Box, Button, Flex, Grid, GridItem, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, Wrap, WrapItem, Image } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { DataContext, DataContextValues } from "../../contexts/DataContext";
import { Party, PartyRecord, Politician, Record } from "../../types";
import { hexToRgb, rgbaToString } from "../../utils/color";
import { ControleRanking } from "./ControleRanking";
import { ControlePartidos } from "./ControlePartidos";

import PartiesRanking from "./PartiesRanking";
import PoliticiansRanking from "./PoliticiansRanking";

export default function RankingPage() {

    const { data: {completeRanking}, hooks: {getRankingData}} = useContext(DataContext)
    const dataIsLoaded = completeRanking ? true : false;

    useEffect(()=>{
        if (!dataIsLoaded) {
            getRankingData();
        }
    },[]);

    const [showParties, setShowParties] = useState(true);
    const [search, setSearch] = useState(null);
    const records = completeRanking ? completeRanking.partyRecords : [];
    const filteredRecords = records.filter(r => r.scoreTotalCount > 0);

    return !dataIsLoaded ? <></> : <PageBuilder/>
    
    function PageBuilder () {

        return <Grid templateAreas={`
            "ctrlPartidos ctrlMain"    
            "partidos main"
        `} 
                gridTemplateRows={`70px 1fr`}
                gridTemplateColumns={`${showParties ? '25%' : '0'} 1fr`}
                h='100%'
                overflow='hidden'
        >

            <GridItem area={'ctrlPartidos'}>
                <ControlePartidos/>
            </GridItem>


            <GridItem area={'ctrlMain'}>
                <ControleRanking/>
            </GridItem>

            <GridItem area={'partidos'} borderLeft={'1px'} borderColor='gray.200' overflowY={'scroll'}>
                <PartiesRanking partyRecords={filteredRecords} />
            </GridItem>

            <GridItem area={'main'} overflowY={'scroll'}>
                <PoliticiansRanking partyRecords={filteredRecords}/>
            </GridItem>
        </Grid>
    }

}