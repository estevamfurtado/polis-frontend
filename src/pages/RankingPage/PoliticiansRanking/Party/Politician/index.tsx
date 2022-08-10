import { Badge, Box, Flex, Text, WrapItem, Image } from "@chakra-ui/react";
import { party, partyRecord, politician, record } from "../../../../../types";

export type PartyRecord = (partyRecord & party & {
    scoreTotal: {
        average: number;
        count: number;
    }
    politicianRecords: PoliticianRecord[]
})
export type PoliticianRecord = record & politician & {};


export default function Politician ({record} : {record: PoliticianRecord}) {
        
    const name = record.name;
    const imageUrl = record.imageUrl || '';
    const uf = record.stateAbbreviation || '';
    const points = Math.round(record.scoreTotal * 10)

    const resultColor = points > 70 ? 'green' : (points > 65 ? 'yellow' : 'red');

    return <WrapItem w={'90px'} fontSize={'sm'}>
        <Flex 
            direction={'column'}
            align={'center'}
            border={'1px'} borderColor='gray.200' 
            w={'100%'} h={'100%'} 
            rounded='md' bg='white' 
            textAlign='center' _hover={{boxShadow: 'md'}}
            cursor='pointer'
        >
            <Flex justify={'space-between'} width={'100%'} flex='0 0 auto'>
                <Badge size='sm' colorScheme={'grey'}>{uf}</Badge>
                <Badge size='sm' colorScheme={resultColor}>{points}</Badge>
            </Flex>
            <Box overflow='clip' objectFit='cover' bg='gray.300' flex='0 0 auto' height='80px' w='100%'>
                <Image src={imageUrl} alt={name} boxSize='100px'/>
            </Box>
            <Text fontSize='xs' flex='0 0 auto' p='1'>{name}</Text>
        </Flex>
    </WrapItem>
}