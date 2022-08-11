import { Badge, HStack, Box, Button, Flex, Grid, GridItem, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, Wrap, WrapItem, Image } from "@chakra-ui/react";
import { useContext } from "react";
import { DataContext, DataContextValues } from "../../../../contexts/DataContext";
import { Party, PartyRecord, Politician, Record, CompletePartyRecord } from "../../../../types";
import { hexToRgb, rgbaToString } from "../../../../utils/color";



export default function PartyElement({partyRecord, index}: {partyRecord: CompletePartyRecord, index: number}) {

    const mainColor: string = partyRecord.party.mainColor || '#777777'
    const avg: number = Math.round((partyRecord.scoreTotal || 0.0)*10);
    const count: number = Math.round((partyRecord.scoreTotalCount || 0));
    const abb: string = partyRecord.partyAbbreviation;

    const rgb = hexToRgb(mainColor);
    const soft = rgbaToString(rgb.r, rgb.g, rgb.b, 0.2);
    const darker = rgbaToString(rgb.r, rgb.g, rgb.b, 1.0, 0.25, false)

    const resultColor = avg > 70 ? 'green' : (avg > 65 ? 'yellow' : 'red');

    return <Tr>
        <Td >{index+1}</Td>
        <Td><Badge bgColor={soft} color={darker}>{abb}</Badge></Td>
        <Td ><Badge colorScheme={resultColor}>{avg}</Badge></Td>
    </Tr>
}