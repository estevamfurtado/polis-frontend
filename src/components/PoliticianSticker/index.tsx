
import { Badge, Box, Flex, Image, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import { Sticker } from "../../types";
import PoliticianModal from "./PoliticianModal";

export default function PoliticianSticker({sticker} : {sticker: Sticker}) {

    const { content: { politicianRecords } } = useContext(DataContext);

    const politicianRecord = politicianRecords?.[sticker.politicianRecordId!] ?? null;
    if (!politicianRecord) {return <></>}

    const {isOpen, onOpen, onClose} = useDisclosure();

    const total = politicianRecord?.scoreTotal ?? 0;
    const badgeColor = total > 7.5 ? 'green' : (total < 6 ? 'red' : 'gray');

    const abb = politicianRecord.partyAbbreviation?.length ?? 0 > 6 ? politicianRecord.partyAbbreviation?.substring(0, 6) : politicianRecord.partyAbbreviation;

    return <><Box w='100%' h='100%' bg='white' p='2' borderRadius='sm' position='relative' onClick={onOpen} cursor='pointer'>

        <VStack position='absolute' left='0' top='0' m='2' align='start' spacing='0'>
            <Badge fontSize={'xs'} colorScheme={badgeColor}>
                {`#${politicianRecord.scoreRanking}`}
            </Badge>
        </VStack>

        <VStack position='absolute' right='0' top='0' m='2' align='end' spacing='0'>
            <Badge fontSize={'xs'}>{abb}</Badge>
        </VStack>
    

        <VStack position='absolute' right='0' bottom='0' width='100%' align='end' spacing='0'>
            <Text fontSize={'xs'} maxW='90%' flex='0 1 auto' textAlign='right' fontWeight={'semibold'} p='1'>
                <span style={{backgroundColor: 'white', padding: '2px 5px'}}>{sticker.title}</span>
            </Text>
        </VStack>

        <Flex direction='column' align='center' justify='end' w='100%' h='100%' borderRadius='sm'>
            <Image w='100%' src={sticker.imageUrl} alt={sticker.title} />
        </Flex>
    </Box>

    <PoliticianModal isOpen={isOpen} onClose={onClose} sticker={sticker} politicianRecord={politicianRecord}/>
    </>
}
