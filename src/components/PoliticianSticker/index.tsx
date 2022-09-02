
import { Box, Center, HStack, Image, useDisclosure, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { RankingContext } from "../../contexts/RankingContext";
import { Sticker } from "../../types";
import PoliticianModal from "./PoliticianModal";

export default function PoliticianSticker({sticker, dontOpen} : {sticker: Sticker, dontOpen?: boolean}) {

    const { rankingData: {data: { politicianRecords }} } = useContext(RankingContext);

    const politicianRecord = politicianRecords?.[sticker.politicianRecordId!] ?? null;
    if (!politicianRecord) {return <></>}

    const {isOpen, onOpen, onClose} = useDisclosure();

    const total = politicianRecord?.scoreTotal ?? 0;
    const badgeColor = total > 7.5 ? 'green.500' : (total < 6 ? 'red.700' : 'white');
    const badgeFontColor = total > 7.5 ? 'white' : (total < 6 ? 'white' : 'gray.900');

    const abb = politicianRecord.partyAbbreviation?.length ?? 0 > 6 ? politicianRecord.partyAbbreviation?.substring(0, 6) : politicianRecord.partyAbbreviation;

    return <>
    <VStack
        w='100%' h='100%'
        bg='white'
        borderRadius='sm' 
        position='relative' onClick={onOpen} cursor='pointer'
        spacing='0'
        overflow='hidden'
        border='1px' borderColor='rgba(255, 255, 255, 0.1)'
        flex='0 0 auto'
    >
        <HStack bg={badgeColor} color={badgeFontColor} w='100%' h='4' justify='space-between' flex='0 0 auto'>
            <Box h='100%' fontSize={'xs'} fontWeight='semibold' px='1' >
                {`#${politicianRecord.scoreRanking}`}
            </Box>
            <Box h='100%' fontSize={'xs'} fontWeight='semibold' px='1'>
                {abb}
            </Box>
        </HStack>

        <Center bg='gray' w='100%' h='50%' flex='1 1 auto' overflow={'hidden'}>
            <Image w='100%' src={sticker.imageUrl} alt={sticker.title} />
        </Center>

        <Box w='100%' fontSize={'10'} fontWeight='semibold' color='gray.900' p='1' bg='white' flex='0 0 auto'>
            {sticker.title}
        </Box>

    </VStack>

    {(dontOpen === true)
        ? <></>
        : <PoliticianModal isOpen={isOpen} onClose={onClose} sticker={sticker} politicianRecord={politicianRecord}/>
    }

    </>
}
