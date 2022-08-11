import { HStack, Button } from "@chakra-ui/react";
import { useContext } from "react";
import { RankingContext } from "../../../contexts/RankingContext";

export function ControlePartidos() {

    const {showPartyRanking, setShowPartyRanking} = useContext(RankingContext)

    return <HStack align={'center'} h='100%' padding='2' justify='start'>
            <Button size='sm' w='150px' minW={'150px'} h='100%'
                variant={'outline'}
                color={showPartyRanking ? 'blue.400' : 'gray.400'}
                fontWeight={'normal'}
                onClick={handleClick}
            >
                Ver por Partidos
            </Button>
    </HStack>

    function handleClick() {
        setShowPartyRanking(!showPartyRanking)
    }
}

