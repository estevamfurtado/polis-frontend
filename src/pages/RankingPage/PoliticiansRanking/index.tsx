import { VStack, Flex, Wrap, WrapItem } from "@chakra-ui/react";
import { useContext } from "react";
import { RankingContext } from "../../../contexts/RankingContext";
import { Party, PartyRecord, Politician, Record, CompletePartyRecord } from "../../../types";
import GroupElement from "./Party";

export default function PoliticiansRanking () {

    const {groups} = useContext(RankingContext)

    const stackElements = groups.map((gp) => {
        return <GroupElement group={gp} key={gp.title}/>
    });

    return <Flex direction='column' align='center' w='100%' padding={5}>
        <Wrap maxW={'780px'} w={'100%'} align={'flex-start'} >
            {stackElements}
        </Wrap>
    </Flex>

}