import { Box, Flex, Text, Image, Badge, VStack, Button } from "@chakra-ui/react"
import { useContext } from "react"
import { DataContext } from "../../../../contexts/DataContext"
import { CompleteSticker } from "../../../../types"

export default function Sticker ({sticker, isPasted, canBePasted, cardId} : {sticker: CompleteSticker, isPasted: boolean, canBePasted: boolean, cardId: number | null}) {

    const {hooks} = useContext(DataContext);

    if (!isPasted) {
        return <Flex gap={1} direction='column' align='center' justify='center' w='100%' h='100%' bg='rgba(0,0,0,0.2)' p='5' borderRadius='md'>
            <Text color='white' fontSize='sm' textAlign={'center'}>{sticker.identifier}</Text>
            <Text fontSize='sm' textAlign={'center'}>{sticker.title}</Text>
            {canBePasted ? <Button colorScheme='whiteAlpha' size='sm' onClick={handleClickPasteCard}>Colar</Button> : <></>}
        </Flex>
    }

    return sticker.type === 'politician' ? politicianType() : partyType()

    function politicianType () {

        const total = sticker.politicianRecord?.scoreTotal ?? 0;
        const badgeColor = total > 7.5 ? 'green' : (total < 6 ? 'red' : '');

        return <Box w='100%' h='100%' bg='white' p='2' borderRadius='sm' position='relative'>

            <VStack position='absolute' left='0' top='0' m='2' align='start' spacing='0'>
                <Badge fontSize={'xs'} colorScheme={badgeColor}>
                    {`#${sticker.politicianRecord.scoreRanking}`}
                </Badge>
            </VStack>

            <VStack position='absolute' right='0' top='0' m='2' align='end' spacing='0'>
                <Badge fontSize={'xs'}>
                    {sticker.politicianRecord.stateAbbreviation}
                </Badge>
            </VStack>


            <VStack position='absolute' right='0' bottom='0' width='100%' align='end' spacing='0' m='2'>
                <Text fontSize={'xs'} maxW='90%' flex='0 1 auto' textAlign='right' fontWeight={'semibold'} bg='white' p='1'>
                    {sticker.title}
                </Text>
            </VStack>

            <Flex direction='column' align='center' justify='end' w='100%' h='100%' borderRadius='sm'>
                <Image w='100%' src={sticker.imageUrl} alt={sticker.title} />
            </Flex>
        </Box>
    }

    function partyType () {
        return <Flex gap={1} 
            direction='column' align='center' justify='center' 
            w='100%' h='100%' bg='white' 
            p='3' borderRadius='md'
            backgroundImage={`url(${'https://cdn.shopify.com/s/files/1/1426/0052/products/silversparkle1212_600x.jpg?v=1618801331'})`}
            backgroundSize='cover'
            backgroundPosition='center'
            backgroundBlendMode={'overlay'}
            backgroundColor={'rgba(255,255,255,0.6)'}
            boxShadow={'sm black'}
        >
            <Image src={sticker.imageUrl} alt={sticker.title}/>
        </Flex>
    }

    async function handleClickPasteCard () {
        if (cardId) {
            await hooks.pasteCard(cardId);
        }
    }
}