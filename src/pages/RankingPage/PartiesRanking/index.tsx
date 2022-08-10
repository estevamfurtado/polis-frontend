import { Badge, HStack, Box, Button, Flex, Grid, GridItem, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, Wrap, WrapItem, Image } from "@chakra-ui/react";
import { useContext } from "react";
import { DataContext, DataContextValues } from "../../../contexts/DataContext";
import { party, partyRecord, politician, record } from "../../../types";
import { hexToRgb, rgbaToString } from "../../../utils/color";
import Party from "./Party";

export type PartyRecordsOrdered = (partyRecord & party & {
    scoreTotal: {
        average: number;
        count: number;
    }
    politicianRecords: PoliticianRecord[]
})[]
export type PoliticianRecord = record & politician & {};

export default function PartiesRanking ({partyRecords} : {partyRecords: PartyRecordsOrdered}) {
    const stackElements = partyRecords.map((pr, idx) => {
        return <Party partyRecord={pr} index={idx} key={idx}/>
    });
    return <>
        <TableContainer whiteSpace='pre-wrap' overflowX={'hidden'} marginY={5}>
            <Table variant='simple' size='sm'>
                <TableCaption >Avaliação feita pelo Ranking dos Políticos</TableCaption>
                <Thead>
                    <Tr>
                        <Th >#</Th>
                        <Th>{`Partido (Sigla)`}</Th>
                        <Th >{`Nota`}</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {stackElements}
                </Tbody>
            </Table>
        </TableContainer>
    </>
}