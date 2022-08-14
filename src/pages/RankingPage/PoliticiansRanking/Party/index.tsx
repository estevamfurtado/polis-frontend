import { Badge, Flex, Wrap, WrapItem, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Party, PartyRecord, Politician, Record, CompletePartyRecord, RankingGroup } from "../../../../types";
import { hexToRgb, rgbaToString } from "../../../../utils/color";
import PoliticianElement from "./Politician";


export default function GroupElement ({group} : {group: RankingGroup}) {

    const [isLoading, setIsLoading] = useState(true)

    const mainColor = group.color;

    const rgb = hexToRgb(mainColor);
    const soft = rgbaToString(rgb.r, rgb.g, rgb.b, 0.2);
    const darker = rgbaToString(rgb.r, rgb.g, rgb.b, 1.0, 0.25, false)

    const politiciansElements = group.records.map((r, index) => {
        return <PoliticianElement key={r.id} record={r} />
    })

    useEffect(() => {
        setIsLoading(false)
    } , [])

    return <Skeleton isLoaded={!isLoading}>
        <WrapItem>
            <Flex gap={4} width={'100%'}>
                <Flex paddingY={2} gap={5} direction={'column'}>
                    <Badge bg={soft} color={darker} >{group.title}</Badge>
                    <Wrap overflow={'visible'}>
                        {politiciansElements}
                    </Wrap>
                </Flex>
            </Flex>
        </WrapItem>
    </Skeleton>
}