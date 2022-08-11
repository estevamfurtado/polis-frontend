import { VStack, Flex } from "@chakra-ui/react";
import { Party, PartyRecord, Politician, Record, CompletePartyRecord } from "../../../types";
import PartyElement from "./Party";


export default function PoliticiansRanking ({partyRecords} : {partyRecords: CompletePartyRecord[]}) {

    const stackElements = partyRecords.map((pr, idx) => {
        return <PartyElement record={pr} index={idx} key={idx}/>
    });

    return <Flex direction='column' align='center' w='100%' padding={5}>
            <VStack maxW={'780px'} w={'100%'} align={'flex-start'} >
            {stackElements}
        </VStack>
    </Flex>

}