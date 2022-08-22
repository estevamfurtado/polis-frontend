import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import { DataContext } from "../DataContext"
import {CompleteRanking, CompleteRecord, RankingGroup, GetDeckResponse} from "../../types"
import variables from "../../services/variables"
import * as api from '../../services/reqs'

type UserInfo = {
    id: number;
    email: string;
    name: string;
}


type NewRequestContextValues = {
    text: string;
    users: UserInfo[];

    requestedUser: {
        info: UserInfo;
        cards: GetDeckResponse['cards'];
        stickers: GetDeckResponse['stickers'];
    } | null;

    offeredCards: {[key: number]: boolean};
    requestedCards: {[key: number]: boolean};

    setText: (text: string) => void;
    setUsers: (users: UserInfo[]) => void;
    setRequestedUser: (user: {
        info: UserInfo, 
        cards: GetDeckResponse['cards'], 
        stickers: GetDeckResponse['stickers'];
    }) => void;
    setOfferedCards: (offeredCards: {[key: number]: boolean}) => void;
    setRequestedCards: (requestedCards: {[key: number]: boolean}) => void;

    cardsYouHaveHeNeeds: {id: number, stickerId: number}[];
    cardsHeHasYouNeed: {id: number, stickerId: number}[];

    toggleOfferedCardId: (id: number) => void;
    toggleRequestedCardId: (id: number) => void;

    searchUsers: (email: string) => void;
    clickUser: (user: UserInfo) => void;
    sendRequest: () => void;
}

export const NewRequestContext = createContext<NewRequestContextValues>({
    text: '',
    users: [],
    requestedUser: null,
    offeredCards: {},
    requestedCards: {},
    setText: () => {},
    setUsers: () => {},
    setRequestedUser: () => {},
    setOfferedCards: () => {},
    setRequestedCards: () => {},
    cardsYouHaveHeNeeds: [],
    cardsHeHasYouNeed: [],
    toggleOfferedCardId: () => {},
    toggleRequestedCardId: () => {},

    searchUsers: (email: string) => {},
    clickUser: (user: UserInfo) => {},
    sendRequest: () => {},
})


export function NewRequestContextProvider ({ children }: PropsWithChildren) {

    const {auth: {user}, content: {cards, stickers}, hooks: {updateDeck}} = useContext(DataContext);

    const [text, setText] = useState('');
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [requestedUser, setRequestedUser] = useState<{info: UserInfo, cards: GetDeckResponse['cards'], stickers: GetDeckResponse['stickers']} | null>(null);
    const [offeredCards, setOfferedCards] = useState<{[key: number]: boolean}>({});
    const [requestedCards, setRequestedCards] = useState<{[key: number]: boolean}>({});

    const cardsYouHaveHeNeeds : {id: number, stickerId: number}[] = [];
    const cardsHeHasYouNeed : {id: number, stickerId: number}[] = [];
    compareAlbum(); 

    const values : NewRequestContextValues = {
        text,
        users,
        requestedUser,
        offeredCards,
        requestedCards,
        setText,
        setUsers,
        setRequestedUser,
        setOfferedCards,
        setRequestedCards,
        cardsYouHaveHeNeeds, cardsHeHasYouNeed,
        toggleOfferedCardId,
        toggleRequestedCardId,
        searchUsers,
        clickUser,
        sendRequest,
    }

    return (
        <NewRequestContext.Provider value={values}>
            {children}
        </NewRequestContext.Provider>
    )


    function compareAlbum() {

        if (!stickers || !cards || !requestedUser || !user) {
            return [[], []]
        }

        const lineStickers = Object.keys(stickers)

        lineStickers.forEach(sId => {
            const id = parseInt(sId);
            const sticker = stickers[id] ?? null;
            if (sticker) {

                const myCards = sticker.cards;
                const hisCards = requestedUser.stickers[id]?.cards ?? [];
                
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
    }

    function toggleOfferedCardId(id: number) {
        toggleCardId(id, offeredCards, setOfferedCards);
    }

    function toggleRequestedCardId(id: number) {
        toggleCardId(id, requestedCards, setRequestedCards);
    }

    function toggleCardId (id: number, cardsState: {[key: number]: boolean}, setCardsState: (cardsState: {[key: number]: boolean}) => void) {
        const newCardsState = {...cardsState};
        newCardsState[id] = !newCardsState[id];
        setCardsState(newCardsState);
    }


    async function clickUser(user: UserInfo) {
        clearRequest();
        const response = await api.getUserDeck(user.id);
        setRequestedUser({
            info: user,
            cards: response.data.cards,
            stickers: response.data.stickers
        });
        setUsers([]);
    }

    
    async function searchUsers (email: string) {
        if (email) {
            const response = await api.searchUsers(email);
            setUsers(response.data);
        }
        else {
            setUsers([]);
        }
    }

    async function sendRequest () {
        if (!requestedUser) {
            return;
        }

        const offer = Object.keys(offeredCards).map(id => parseInt(id)).filter(id => offeredCards[id]);
        const request = Object.keys(requestedCards).map(id => parseInt(id)).filter(id => requestedCards[id]);

        const {id: deckId} = await api.postExchangeRequest(requestedUser.info.id, offer, request);
        clearRequest();

        await updateDeck();
    }

    async function clearRequest () {
        setOfferedCards([]);
        setRequestedCards([]);
    }

}
