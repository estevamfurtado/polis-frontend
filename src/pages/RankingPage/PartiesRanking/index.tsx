import { Badge, HStack, Box, Button, Flex, Grid, GridItem, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, Wrap, WrapItem, Image } from "@chakra-ui/react";
import { useContext } from "react";
import { DataContext, DataContextValues } from "../../../contexts/DataContext";
import { Party, PartyRecord, Politician, Record, CompletePartyRecord } from "../../../types";
import { hexToRgb, rgbaToString } from "../../../utils/color";
import PartyElement from "./Party";



export default function PartiesRanking () {

    return <></>

    // const {content: {partyRecords}} = useContext(DataContext);
    // if (!partyRecords) {return <></>}

    // const stackElements = partyRecords.map((pr) => {
    //     return <PartyElement partyRecordId={pr} key={pr}/>
    // });
    // return <>
    //     <TableContainer whiteSpace='pre-wrap' overflowX={'hidden'} marginY={5} w='100%' h='50%' bg='blue'>
    //         <Table variant='simple' size='sm'>
    //             <TableCaption >Avaliação feita pelo Ranking dos Políticos</TableCaption>
    //             <Thead>
    //                 <Tr>
    //                     <Th >#</Th>
    //                     <Th>{`Partido (Sigla)`}</Th>
    //                     <Th >{`Nota`}</Th>
    //                 </Tr>
    //             </Thead>
    //             <Tbody>
    //                 {stackElements}
    //             </Tbody>
    //         </Table>
    //     </TableContainer>
    // </>
}