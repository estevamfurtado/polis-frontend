
import { Badge, Box, Flex, HStack, Image, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import { Sticker } from "../../types";
import PoliticianModal from "./PoliticianModal";

export default function PoliticianSticker({sticker, dontOpen} : {sticker: Sticker, dontOpen?: boolean}) {

    const { content: { politicianRecords } } = useContext(DataContext);

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
    >
        <HStack bg={badgeColor} color={badgeFontColor} w='100%' h='4' justify='space-between' flex='0 0 auto'>
            <Box h='100%' fontSize={'xs'} fontWeight='semibold' px='1' >
                {`#${politicianRecord.scoreRanking}`}
            </Box>
            <Box h='100%' fontSize={'xs'} fontWeight='semibold' px='1'>
                {abb}
            </Box>
        </HStack>

        <Box bg='gray' w='100%' h='100%' flex='1 1 auto'>
            <Flex direction='column' align='center' justify='end' w='100%' h='100%' borderRadius='sm' overflow='hidden'>
                <Image w='100%' src={sticker.imageUrl} alt={sticker.title} />
            </Flex>
        </Box>

        <Box w='100%' fontSize={'xs'} fontWeight='semibold' color='gray.900' p='1' bg='white' flex='0 0 auto'>
            {sticker.title}
        </Box>

    </VStack>

    {(dontOpen === true)
        ? <></>
        : <PoliticianModal isOpen={isOpen} onClose={onClose} sticker={sticker} politicianRecord={politicianRecord}/>
    }

    </>
}


    // return <>
    // <Box
    //     w='100%' h='100%'
    //     bg='white'
    //     borderRadius='sm' 
    //     position='relative' onClick={onOpen} cursor='pointer'
    //     overflow='hidden'
    // >

    //     <HStack bg='green' w='100%' h='3'>
    //         <Box fontSize={'xs'} bg={badgeColor} color={badgeFontColor}>
    //             {`#${politicianRecord.scoreRanking}`}
    //         </Box>
    //         <Box fontSize={'xs'} bg={badgeColor} color={badgeFontColor}>
    //             {abb}
    //         </Box>
    //     </HStack>
    

    //     <VStack position='absolute' right='0' bottom='0' width='100%' align='end' spacing='0'>
    //         <Text color={'gray.900'} fontSize={'xs'} maxW='90%' flex='0 1 auto' textAlign='right' fontWeight={'semibold'} p='0.5'>
    //             <span style={{backgroundColor: 'white', padding: '2px 5px'}}>{sticker.title}</span>
    //         </Text>
    //     </VStack>

    //     <Flex direction='column' align='center' justify='end' w='100%' h='100%' borderRadius='sm' overflow='hidden'>
    //         <Image w='100%' src={sticker.imageUrl} alt={sticker.title} />
    //     </Flex>
    // </Box>