import { VStack, Box } from "@chakra-ui/react"
import { useContext } from "react"
import StickerComponent from "../../../Sticker";
import { NewRequestContext } from "../../../../contexts/NewRequestContext"
import { CardsWrap } from "../../../CardsWrap";
import { DeckContext } from "../../../../contexts/DeckContext";


export default function CompareAlbum() {

    const {deckData: {data: {cards}}} = useContext(DeckContext);

    const {
        cardsYouHaveHeNeeds, offeredCards, setOfferedCards, toggleOfferedCardId, 
        cardsHeHasYouNeed, requestedCards, setRequestedCards, toggleRequestedCardId, 
        requestedUser} = useContext(NewRequestContext);

    if (!cards || !requestedUser || !offeredCards || !requestedCards) {
        return <></>
    }

    const nome = requestedUser.info.username ?? requestedUser.info.email?.split('@')[0] ?? ''; 

    return <VStack w='100%' align='start' spacing='5'>
        <CardsWrap title={`Você tem, ${nome} precisa (${cardsYouHaveHeNeeds.length})`} height='150px' button={{title: 'Oferecer o máximo', onClick: selectAllCardsYouHave}}>
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
        <CardsWrap title={`Você precisa, ${nome} tem (${cardsHeHasYouNeed.length})`} height='150px' button={{title: 'Pedir o máximo', onClick: selectAllCardsHeHas}}>
            {
                cardsHeHasYouNeed.map(c => {
                    const isSelected = requestedCards[c.id] ?? false;
                    return <Box 
                        onClick={() => toggleRequestedCardId(c.id)}
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

    function selectAllCardsYouHave() {
        const off = {...offeredCards};
        cardsYouHaveHeNeeds.forEach(c => {
            off[c.id] = true;
        });
        setOfferedCards({...off});
    }

    function selectAllCardsHeHas() {
        const req = {...requestedCards};
        cardsHeHasYouNeed.forEach((c, i) => {
            if (i < cardsHeHasYouNeed.length) {
                req[c.id] = true;
            }
        });
        setRequestedCards({...req});
    }

}