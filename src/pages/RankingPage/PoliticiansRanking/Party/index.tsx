import { Badge, Flex, Wrap } from "@chakra-ui/react";
import { party, partyRecord, politician, record } from "../../../../types";
import { hexToRgb, rgbaToString } from "../../../../utils/color";
import Politician from "./Politician";

export type PartyRecord = (partyRecord & party & {
    scoreTotal: {
        average: number;
        count: number;
    }
    politicianRecords: PoliticianRecord[]
})
export type PoliticianRecord = record & politician & {};

export default function Party ({record, index} : {record: PartyRecord, index: number}) {

    const mainColor = record.mainColor || '#777777'
    const avg: number = Math.round((record.scoreTotal.average || 0.0)*10);
    const count: number = Math.round((record.scoreTotal.count || 0));
    const abb: string = record.partyAbbreviation;

    const rgb = hexToRgb(mainColor);
    const soft = rgbaToString(rgb.r, rgb.g, rgb.b, 0.2);
    const darker = rgbaToString(rgb.r, rgb.g, rgb.b, 1.0, 0.25, false)

    const resultColor = avg > 70 ? 'green' : (avg > 65 ? 'yellow' : 'red');

    const politiciansElements = record.politicianRecords.map((r, index) => {
        return <Politician key={index} record={r} />
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