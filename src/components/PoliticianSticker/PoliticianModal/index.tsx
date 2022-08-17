import { CheckCircleIcon, WarningIcon, ExternalLinkIcon } from "@chakra-ui/icons"
import { Progress, Box, Flex, List,ListIcon, Text, Button, Modal, ModalBody, ModalCloseButton, VStack, HStack, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Image, Badge, Checkbox, ListItem, Link } from "@chakra-ui/react"
import { Sticker, Record } from "../../../types"


export default function PoliticianModal({isOpen, onClose, sticker, politicianRecord} : {isOpen: boolean, onClose: () => void, sticker: Sticker, politicianRecord: Record }) {

    return <Modal isOpen={isOpen} onClose={onClose} size='lg'>
        <ModalOverlay />
        <ModalContent>

            <ModalHeader>{sticker.title}</ModalHeader>
            <ModalCloseButton />
            
            <ModalBody>
                <VStack w='100%' spacing='10'>
                    <HStack w='100%' spacing='5'  align='start' justify='start'>
                        <VStack flex='0 0 auto'>
                            <Flex w='150px' h='150px' bg='black' borderRadius={'100%'} align='start' overflow={'clip'}>
                                <Image src={sticker.imageUrl} alt={sticker.title} w='100%' h='100%' objectFit={'cover'} />
                            </Flex>
                        </VStack>
                        <VStack flex='1 1 auto' align='start'>
                            {line('Partido', politicianRecord.partyAbbreviation ?? '-')}
                            {line('Estado', politicianRecord.stateAbbreviation ?? '-')}
                            {line('# de votos', String(politicianRecord.quantityVote ?? '') ?? '?')}
                        </VStack>
                    </HStack>

                    <VStack align={'start'} width='100%'>
                        <Text fontWeight={'bold'}>Avaliação</Text>
                        {link(`Avaliação completa de ${sticker.title}`, politicianRecord.sourceUrl ?? '?')}

                        <HStack w='100%' spacing='10'>

                            <VStack w='50%' align='start' justify='start'>
                                {scoreProgress(politicianRecord.scoreTotal, 'Total')}
                                {scoreProgress(politicianRecord.scorePrivileges, 'Antiprivilégio')}
                                {scoreProgress(politicianRecord.scoreWastage, 'Antidesperdício')}
                            </VStack>
                            <VStack w='50%' align='start' justify='start'>
                                <List>
                                    {checkValue(politicianRecord.cutAidShift, 'Cortou auxílio-mudança')}
                                    {checkValue(politicianRecord.cutHousingAllowance, 'Cortou auxílio-moradia')}
                                    {checkValue(politicianRecord.cutRetirement, 'Cortou aposentadoria especial')}
                                </List>
                            </VStack>

                        </HStack>

                    </VStack>

                    <VStack align={'start'}>
                        <Text fontWeight={'bold'}>Sobre</Text>
                        <Text fontWeight={'normal'}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, beatae doloremque atque numquam iste laborum, ut corrupti labore officia doloribus sunt nulla, architecto placeat! Beatae ea explicabo vero expedita sequi.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, beatae doloremque atque numquam iste laborum, ut corrupti labore officia doloribus sunt nulla, architecto placeat! Beatae ea explicabo vero expedita sequi.
                        </Text>
                    </VStack>

                </VStack>
            </ModalBody>

            <ModalFooter>
            <Button variant='ghost' onClick={onClose}>Fechar</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>


    function scoreProgress (value: number | null, title: string) {
        return <VStack w='100%' align='start' spacing='1'>
            <Text color='gray.600' fontSize='sm'>{`${title} (${Math.round((value ?? 0)*10) ?? '?'})`}</Text>
            <Progress borderRadius='sm' colorScheme="teal" size='lg' value={(value ?? 0) * 10} w='100%'/>
        </VStack>
    }

    function checkValue (value: boolean | null, title: string) {
        return <ListItem color='gray.600' fontSize='sm' lineHeight={'2'}>
            <ListIcon as={value ? CheckCircleIcon : WarningIcon} color={value ? 'teal.500' : 'red.500'} /> 
            {title}
        </ListItem>
    }

    function line (title: string, value: string) {
        return <HStack w='100%'>
            <Text color='gray.600' fontSize='sm' w='40%'>{title}</Text>
            <Text color='gray.800' fontSize='sm' w='60%'>{value}</Text>
        </HStack>
    }

    function link (title: string, value: string) {
        return <HStack w='100%'>
            <Link color='blue.600' fontSize='xs' w='100%' href={value} isExternal>
                {title}
                <ExternalLinkIcon mx='2px' />
            </Link>
        </HStack>
    }
}

