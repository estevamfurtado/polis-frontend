import { createContext, PropsWithChildren, useContext, useState } from "react"
import {GetDeckResponse, UserInfo, GetAlbumResponse} from "../../types"
import * as api from '../../services/reqs'
import { AuthContext } from "../AuthContext";
import { DeckContext } from "../DeckContext";
import { AlbumContext } from "../AlbumContext";



type NewRequestContextValues = {
    text: string;
    users: UserInfo[];

    requestedUser: {
        info: UserInfo;
        cards: GetDeckResponse['cards'];
        stickers: GetAlbumResponse['stickers'];
    } | null;

    offeredCards: {[key: number]: boolean};
    requestedCards: {[key: number]: boolean};

    setText: (text: string) => void;
    setUsers: (users: UserInfo[]) => void;
    setRequestedUser: (user: {
        info: UserInfo, 
        cards: GetDeckResponse['cards'], 
        stickers: GetAlbumResponse['stickers'];
    }) => void;
    setOfferedCards: (offeredCards: {[key: number]: boolean}) => void;
    setRequestedCards: (requestedCards: {[key: number]: boolean}) => void;

    cardsYouHaveHeNeeds: {id: number, stickerId: number}[];
    cardsHeHasYouNeed: {id: number, stickerId: number}[];

    toggleOfferedCardId: (id: number) => void;
    toggleRequestedCardId: (id: number) => void;

    searchUsers: (email: string) => Promise<void>;
    clickUser: (user: UserInfo) => Promise<void>;
    sendRequest: () => Promise<void>;
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

    searchUsers: async (email: string) => {},
    clickUser: async (user: UserInfo) => {},
    sendRequest: async () => {},
})


export function NewRequestContextProvider ({ children }: PropsWithChildren) {

    const {authData: {data: {user}} } = useContext(AuthContext);
    const {deckData: {data: {cards}, actions: {updateDeck}}} = useContext(DeckContext);
    const {albumData: {data: {stickers}}} = useContext(AlbumContext);

    const [text, setText] = useState('');
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [requestedUser, setRequestedUser] = useState<{info: UserInfo, cards: GetDeckResponse['cards'], stickers: GetAlbumResponse['stickers']} | null>(null);
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

            const myCards = cards.bySticker[id] ?? null;
            const hisCards = requestedUser.cards.bySticker[id] ?? null;

            const iNeed = !myCards || (myCards.all.length === 0);
            const iHave = myCards && myCards.notPasted.repeated.length > 0;
            const myCard = iHave ? myCards?.notPasted.repeated[0] : null;

            const heNeeds = !hisCards || hisCards.all.length === 0;
            const heHas = hisCards && hisCards.notPasted.repeated.length > 0;
            const hisCard = heHas ? hisCards?.notPasted.repeated[0] : null;

            
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
        })
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
