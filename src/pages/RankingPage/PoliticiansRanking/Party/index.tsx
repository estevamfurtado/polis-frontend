import { Badge, Flex, Wrap } from "@chakra-ui/react";
import { Party, PartyRecord, Politician, Record, CompletePartyRecord } from "../../../../types";
import { hexToRgb, rgbaToString } from "../../../../utils/color";
import PoliticianElement from "./Politician";



export default function PartyElement ({record, index} : {record: CompletePartyRecord, index: number}) {

    const mainColor = record.party.mainColor || '#777777'
    const avg: number = Math.round((record.scoreTotal)*10);
    const count: number = Math.round((record.scoreTotalCount));
    const abb: string = record.partyAbbreviation;

    const rgb = hexToRgb(mainColor);
    const soft = rgbaToString(rgb.r, rgb.g, rgb.b, 0.2);
    const darker = rgbaToString(rgb.r, rgb.g, rgb.b, 1.0, 0.25, false)

    const resultColor = avg > 70 ? 'green' : (avg > 65 ? 'yellow' : 'red');

    const politiciansElements = record.records.map((r, index) => {
        return <PoliticianElement key={index} record={r} />
    })

    return <Flex gap={4} width={'100%'}>
        <Flex paddingY={2} gap={5} direction={'column'}>
            <Badge bg={soft} color={darker} >{abb}</Badge>
            <Wrap overflow={'visible'}>
                {politiciansElements}
            </Wrap>
        </Flex>
    </Flex>
}