import { Badge, HStack, Box, Button, Flex, Grid, GridItem, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, Wrap, WrapItem, Image } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { DataContext, DataContextValues } from "../../contexts/DataContext";
import { party, partyRecord, politician, record } from "../../types";
import { hexToRgb, rgbaToString } from "../../utils/color";
import { Bar } from "./Bar";

import PartiesRanking from "./PartiesRanking";
import PoliticiansRanking from "./PoliticiansRanking";


export type PartyRecordsOrdered = (partyRecord & party & {
    scoreTotal: {
        average: number;
        count: number;
    }
    politicianRecords: PoliticianRecord[]
})[]
export type PoliticianRecord = record & politician & {};


export default function RankingPage() {

    const { data: {ranking, records, states, politicians, partyRecords, parties, cardModels}} = useContext(DataContext)
    const dataIsLoaded = ranking && records && states && politicians && partyRecords && parties && cardModels;

    const [showBar, setShowBar] = useState(false);
    const [showParties, setShowParties] = useState(false);
    const [search, setSearch] = useState(null);

    const partyRecordsOrdered : PartyRecordsOrdered = dataIsLoaded ? ranking.partyRecords.map((pr) => {
        const partyRecord = partyRecords[pr.id];
        const party = parties.abbreviation[partyRecord.partyAbbreviation];
        const scoreTotal = partyRecord.scores.find(e => e.type === 'scoreTotal') || {count: 0, average: 0};
        const politicianRecords = partyRecord.records.map(r => {
            const record = records[r.id];
            const politician = politicians[record.politicianId];
            return {...record, ...politician};
        }).sort((a, b) => b.scoreTotal - a.scoreTotal);
        return {...partyRecord, ...party, scoreTotal, politicianRecords};
    }).filter(pr => {
        console.log('aqui');
        console.log(pr);
        return pr.scoreTotal.count > 0;
    }).sort((a,b) => {
        const avg_a = a.scoreTotal.average || 0;
        const avg_b = b.scoreTotal.average || 0;
        return avg_b - avg_a;
    }) : [];

    return !dataIsLoaded ? <></> : <PageBuilder/>
    
    function PageBuilder () {
        return <Grid templateAreas={`
            "bar bar"
            "partidos main"
        `} 
                gridTemplateRows={`${showBar ? '50px' : '0'} 1fr`}
                gridTemplateColumns={`${showParties ? '25%' : '0'} 1fr`}
                h='100%'
                overflow='hidden'
        >
            <GridItem area={'bar'} borderBottom={'1px'} borderColor='gray.200'>
                <Bar/>
            </GridItem>

            <GridItem area={'partidos'} borderLeft={'1px'} borderColor='gray.200' overflowY={'scroll'}>
                <PartiesRanking partyRecords={partyRecordsOrdered} />
            </GridItem>

            <GridItem area={'main'} overflowY={'scroll'}>
                <PoliticiansRanking partyRecords={partyRecordsOrdered}/>
            </GridItem>
        </Grid>
    }

}