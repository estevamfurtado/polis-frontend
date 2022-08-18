import { Button, VStack, HStack, Heading, Wrap, Badge } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { DataContext } from "../../../../contexts/DataContext";
import { CompleteSticker, GetDeckResponse } from "../../../../types";
import * as api from "../../../../services/reqs";
import WrappedCards from "./WrappedCards";
import { updateModuleBlock } from "typescript";


type UserInfo = {
    id: number;
    email: string;
    name: string;
}

export default function NewRequest ({
    reqUser, userCards, userStickers,
} : {
    reqUser: UserInfo, 
    userCards: GetDeckResponse['cards'], 
    userStickers: GetDeckResponse['stickers'],
}) {

    const {auth: {user}, content: {cards, stickers}, hooks: {updateDeck}} = useContext(DataContext);

    const [offeredCards, setOfferedCards] = useState<number[]>([]);
    const [requestedCards, setRequestedCards] = useState<number[]>([]);

    if (!cards || !stickers || !user) {
        return <></>
    }

    const [cardsYouHaveHeNeeds, cardsHeHasYouNeed] = compareAlbum();

    return <VStack w='100%' align='center' spacing='10' pt='10'>
        <Heading fontSize='xl'>{reqUser.name}</Heading>
        <HStack w='100%' spacing='3'>
            <CompareAlbumBrief />
        </HStack>
        <SendRequestButton />
    </VStack>  

    function compareAlbum() {

        if (!stickers) {
            return [[], []]
        }

        const cardsYouHaveHeNeeds : {id: number, stickerId: number}[] = [];
        const cardsHeHasYouNeed : {id: number, stickerId: number}[] = [];

        const lineStickers = Object.keys(stickers)

        lineStickers.forEach(sId => {
            const id = parseInt(sId);
            const sticker = stickers[id] ?? null;
            if (sticker) {
                const identifier = sticker.identifier;

                const myCards = sticker.cards;
                const hisCards = userStickers[id]?.cards ?? [];
                
                const iNeed = myCards.all.length === 0;
                const iHave = myCards.notPasted.repeated.length > 0;
                const myCard = iHave ? myCards.notPasted.repeated[0] : null;
    
                const heNeeds = hisCards.all.length === 0;
                const heHas = hisCards.notPasted.repeated.length > 0;
                const hisCard = heHas ? hisCards.notPasted.repeated[0] : null;
    
                
                if (iHave && heNeeds && myCard) {
                    cardsYouHaveHeNeeds.push({
                        id: myCard,
                        stickerId: id,
                    });
                }
                if (iNeed && heHas && hisCard) {
                    cardsHeHasYouNeed.push({
                        id: hisCard,
                        stickerId: id,
                    });
                }
            }
        });

        return [cardsYouHaveHeNeeds, cardsHeHasYouNeed];
    }

    
    function CompareAlbumBrief() {
        return <VStack w='100%' align='start' spacing='10'>
            <VStack w='100%' spacing='5'>
                <Heading fontSize='sm'>{`Você está oferecendo ${offeredCards.length} figurinhas`}</Heading>
                <WrappedCards cardIds={cardsYouHaveHeNeeds} cardArray={offeredCards} setCardArray={setOfferedCards} />
            </VStack>
            <VStack w='100%' spacing='3'>
                <Heading fontSize='sm'>{`Você está pedindo ${requestedCards.length} figurinhas`}</Heading>
                <WrappedCards cardIds={cardsHeHasYouNeed} cardArray={requestedCards} setCardArray={setRequestedCards} />
            </VStack>
        </VStack>
    }

    function SendRequestButton () {
        return <Button onClick={sendRequest} isDisabled={offeredCards.length + requestedCards.length  === 0} >Enviar proposta</Button>
    
        async function sendRequest () {
            if (!reqUser) {return;}
            await api.postExchangeRequest(reqUser.id, offeredCards, requestedCards)
            setOfferedCards([]);
            setRequestedCards([]);
            await updateDeck();
            
        }
    
    }
    

}