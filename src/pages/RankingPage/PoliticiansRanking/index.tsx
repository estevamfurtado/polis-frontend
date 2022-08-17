import { VStack, Flex, Wrap, WrapItem, Skeleton } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { RankingContext } from "../../../contexts/RankingContext";
import { Party, PartyRecord, Politician, Record, CompletePartyRecord } from "../../../types";
import GroupElement from "./Party";

export default function PoliticiansRanking () {


    const [isLoading, setIsLoading] = useState(true)
    const {groups} = useContext(RankingContext)

    useEffect(() => {
        setIsLoading(false)
    }, [])

    const stackElements = groups.map((gp) => {
        return <GroupElement group={gp} key={gp.title}/>
    });


    return <Flex direction='column' align='center' w='100%' h='100%' padding={5} overflow='scroll'>
        <Skeleton isLoaded={!isLoading}>
            <Wrap maxW={'780px'} w={'100%'} align={'flex-start'} >
                {stackElements}
            </Wrap>
        </Skeleton>
    </Flex>

}