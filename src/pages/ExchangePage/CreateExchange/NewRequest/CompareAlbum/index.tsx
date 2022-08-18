import { VStack, HStack, Heading, Box } from "@chakra-ui/react"
import { useContext } from "react"
import StickerComponent from "../../../../../components/Sticker";
import { DataContext } from "../../../../../contexts/DataContext"
import { NewRequestContext } from "../../../../../contexts/NewRequestContext"

export default function CompareAlbum() {

    const {content: {cards, stickers}} = useContext(DataContext);
    const {
        cardsYouHaveHeNeeds, offeredCards, toggleOfferedCardId, 
        cardsHeHasYouNeed, requestedCards, toggleRequestedCardId, 
        requestedUser} = useContext(NewRequestContext);

    if (!cards || !requestedUser || !offeredCards || !requestedCards || !stickers) {
        return <></>
    }

    const offer = Object.values(offeredCards).filter(v => v);
    const request = Object.values(requestedCards).filter(v => v);

    return <VStack w='100%' align='start' spacing='10'>
        <VStack w='100%' spacing='5'>
            <Heading fontSize='sm'>{`Você está oferecendo ${offer.length} figurinhas`}</Heading>
            <HStack w='100%' overflow='scroll' spacing='2'>
                {
                    cardsYouHaveHeNeeds.map(c => {
                        const isSelected = offeredCards[c.id] ?? false;
                        return <Box 
                            border='2px solid' borderColor={isSelected ? 'blue.100' : 'gray.100'}
                            onClick={() => toggleOfferedCardId(c.id)}
                            opacity={isSelected ? 1 : 0.5}
                            cursor='pointer'
                            key={c.id}
                            borderRadius='sm'
                        >
                            <StickerComponent stickerId={c.stickerId} dontOpen={true} w={100} h={130}/>
                        </Box>
                    })
                }
            </HStack>
        </VStack>
        <VStack w='100%' spacing='3'>
            <Heading fontSize='sm'>{`Você está pedindo ${request.length} figurinhas`}</Heading>
            <HStack w='100%' overflow='scroll' spacing='2'>
                {
                    cardsHeHasYouNeed.map(c => {
                        const isSelected = requestedCards[c.id] ?? false;
                        return <Box 
                            border='2px solid' borderColor={isSelected ? 'blue.100' : 'gray.100'}
                            onClick={() => toggleRequestedCardId(c.id)}
                            opacity={isSelected ? 1 : 0.5}
                            cursor='pointer'
                            key={c.id}
                            borderRadius='sm'
                        >
                            <StickerComponent stickerId={c.stickerId} dontOpen={true} w={100} h={130}/>
                        </Box>
                    })
                }
            </HStack>
        </VStack>
    </VStack>
}