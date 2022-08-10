import { VStack, Flex } from "@chakra-ui/react";
import { party, partyRecord, politician, record } from "../../../types";
import Party from "./Party";

export type PartyRecord = (partyRecord & party & {
    scoreTotal: {
        average: number;
        count: number;
    }
    politicianRecords: PoliticianRecord[]
})
export type PoliticianRecord = record & politician & {};

export default function PoliticiansRanking ({partyRecords} : {partyRecords: PartyRecord[]}) {

    const stackElements = partyRecords.map((pr, idx) => {
        return <Party record={pr} index={idx} key={idx}/>
    });

    return <Flex direction='column' align='center' w='100%' padding={5}>
            <VStack maxW={'780px'} w={'100%'} align={'flex-start'} >
            {stackElements}
        </VStack>
    </Flex>

}