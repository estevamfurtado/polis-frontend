import { Badge, HStack, Box, Button, Flex, Grid, GridItem, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, Wrap, WrapItem, Image } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../contexts/DataContext";

import { RankingContext, RankingProvider } from "../../../contexts/RankingContext";

import { ControleRanking } from "../ControleRanking";
import { ControlePartidos } from "../ControlePartidos";

import PartiesRanking from "../PartiesRanking";
import PoliticiansRanking from "../PoliticiansRanking";

export default function RankingGrid () {
    
    const {showPartyRanking} = useContext(RankingContext);

    const partyRankingSize = showPartyRanking ? "'300px'" : "0px";

    const parties = <GridItem area={'partidos'} borderLeft={'1px'} borderColor='gray.200' overflowY={'scroll'}>
        <PartiesRanking/>
    </GridItem>

    return <Grid templateAreas={`
        "ctrlPartidos ctrlMain"    
        "partidos main"
    `} 
        gridTemplateRows={`50px 1fr`}
        gridTemplateColumns={`${partyRankingSize} 1fr`}
        h='100%'
        overflow='hidden'
    >

        <GridItem area={'ctrlPartidos'}>
            <ControlePartidos/>
        </GridItem>

        <GridItem area={'ctrlMain'}>
            <ControleRanking/>
        </GridItem>

        {showPartyRanking ? parties : <></>}

        <GridItem area={'main'} overflowY={'scroll'}>
            <PoliticiansRanking/>
        </GridItem>
    </Grid>

}