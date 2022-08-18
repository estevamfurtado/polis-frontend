import { Badge, Box, Flex, Text, WrapItem, Image, Skeleton } from "@chakra-ui/react";
import { useState , useEffect, useContext} from "react";
import { DataContext } from "../../../../../contexts/DataContext";
import { RankingContext } from "../../../../../contexts/RankingContext";
import variables from "../../../../../services/variables";



export default function PoliticianElement ({recordId} : {recordId: number}) {
    
    const {content: {politicianRecords, politicians}} = useContext(DataContext);
    
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(false)
    } , [])

    const record = politicianRecords?.[recordId] ?? null;
    if (!record) {return <></>}
    
    const politician = record.politicianId ? (politicians?.[record.politicianId] ?? null) : null;
    if (!politician) {return <></>}
    
    const {search, showBad, showGood, showNeutral, showState, filterState, filterSearch} = useContext(RankingContext);

    const name = politician.name;
    const imageUrl = politician.imageUrl || '';
    const uf = record.stateAbbreviation || '';
    const position = record.scoreRanking || 0;

    const status = !position ? 'bad'
                    : position <= variables.values.good ? "good"
                    : position < variables.values.neutral ? "neutral"
                    : 'bad';

    const resultColor = (status === 'good') ? 'green' : (status === 'bad' ? 'red' : 'yellow');
    

    let show = true;
    if (filterState) {if (uf !== showState) {show = false;}}
    if (filterSearch) {if (!name.toLowerCase().includes(search.toLowerCase())) {show = false;}}
    if (!showBad && status === 'bad') {show = false;}
    else if (!showGood && status === 'good') {show = false;}
    else if (!showNeutral && status === 'neutral') {show = false;}



    if (!show) {return <></>}

    return <Skeleton isLoaded={!isLoading}>
        <WrapItem w={'90px'} fontSize={'sm'}>
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
                    <Badge size='sm' colorScheme={resultColor}>{position ? position : '?'}</Badge>
                </Flex>
                <Box overflow='hidden' bg='gray.300' flex='0 0 auto' height='80px' w='100%'>
                    <Image src={imageUrl} alt={name} objectFit='cover'/>
                </Box>
                <Text fontSize='xs' flex='0 0 auto' p='1' bg='white'>{name}</Text>
            </Flex>
        </WrapItem>
    </Skeleton>
}