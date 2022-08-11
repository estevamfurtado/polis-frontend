import { Badge, Box, Flex, Text, WrapItem, Image } from "@chakra-ui/react";
import { Party, PartyRecord, Politician, Record, CompleteRecord } from "../../../../../types";




export default function PoliticianElement ({record} : {record: CompleteRecord}) {
        
    const name = record.politician.name;
    const imageUrl = record.politician.imageUrl || '';
    const uf = record.stateAbbreviation || '';
    const points = Math.round((record.scoreTotal || 0) * 10)

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
            <Box overflow='clip' bg='gray.300' flex='0 0 auto' height='80px' w='100%'>
                <Image src={imageUrl} alt={name} objectFit='cover'/>
            </Box>
            <Text fontSize='xs' flex='0 0 auto' p='1'>{name}</Text>
        </Flex>
    </WrapItem>
}