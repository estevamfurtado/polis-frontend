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

    const nome = requestedUser.info.name.split(' ')[0];

    const offer = Object.values(offeredCards).filter(v => v);
    const request = Object.values(requestedCards).filter(v => v);

    return <VStack w='100%' align='start' spacing='5'>
        <CardsWrap title={`Você tem, ${nome} precisa`} height='150px'>
            {
                cardsYouHaveHeNeeds.map(c => {
                    const isSelected = offeredCards[c.id] ?? false;
                    return <Box 
                        onClick={() => toggleOfferedCardId(c.id)}
                        opacity={isSelected ? 1 : 0.5}
                        cursor='pointer'
                        key={c.id}
                    >
                        <StickerComponent stickerId={c.stickerId} dontOpen={true} 
                        w={isSelected ? 100 : 100*0.8} 
                        h={isSelected ? 130 : 130*0.8}/>
                    </Box>
                })
            }
        </CardsWrap>
        <CardsWrap title={`Você precisa, ${nome} tem`} height='150px'>
            {
                cardsHeHasYouNeed.map(c => {
                    const isSelected = offeredCards[c.id] ?? false;
                    return <Box 
                        onClick={() => toggleOfferedCardId(c.id)}
                        opacity={isSelected ? 1 : 0.5}
                        cursor='pointer'
                        key={c.id}
                    >
                        <StickerComponent stickerId={c.stickerId} dontOpen={true} 
                        w={isSelected ? 100 : 100*0.8} 
                        h={isSelected ? 130 : 130*0.8}/>
                    </Box>
                })
            }
        </CardsWrap>
    </VStack>
}