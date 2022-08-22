import { VStack, HStack, Heading, Box } from "@chakra-ui/react"
import { useContext } from "react"
import StickerComponent from "../../../Sticker";
import { DataContext } from "../../../../contexts/DataContext"
import { NewRequestContext } from "../../../../contexts/NewRequestContext"
import { CardsWrap } from "../../../CardsWrap";

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

    return <VStack w='100%' align='start' spacing='3'>
        <CardsWrap title={`Você está oferecendo ${offer.length} figurinhas`} height='150px'>
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
        </CardsWrap>
        <CardsWrap title={`Você está pedindo ${request.length} figurinhas`} height='150px'>
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
        </CardsWrap>
    </VStack>
}