import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import useToken from "../../hooks/useToken"
import { getAlbum, getDeck, getRanking, getUser } from "../../services/services/reqs"

import {
    token, card, deck, ranking, politician, candidate, album,
    party, state, record, partyRecord, cardModel, page, sticker, person
} from "../../types"


type politicians = {[key: number]: politician}
type candidates = {[key: number]: candidate}
type parties = {id : {[key: number]: party}, abbreviation: {[key: string]: party}}
type states = {id : {[key: number]: state}, abbreviation: {[key: string]: state}}
type records = {[key: number]: record}
type partyRecords = {[key: number]: partyRecord}
type cards = {[key: number]: card}
type stickers = {[key: number]: sticker}
type pages = {[key: number]: page}
type cardModels = {[key: number]: cardModel}


export type DataContextValues = {data: {

        token: token | null
        setToken: (input: string | null) => void

        user: person | null
        setUser: (input: person | null) => void
    
        ranking: ranking | null
        setRanking: (ranking: ranking) => void

        politicians: politicians | null
        setPoliticians: (politicians: politicians) => void
        
        candidates: candidates | null
        setCandidates: (candidates: candidates) => void

        parties: parties | null
        setParties: (parties: parties) => void

        states: states | null
        setStates: (states: states) => void

        records: records | null
        setRecords: (records: records) => void

        partyRecords: partyRecords | null
        setPartyRecords: (partyRecords: partyRecords) => void

        cards: cards | null
        setCards: (cards: cards) => void

        stickers: stickers | null
        setStickers: (stickers: stickers) => void

        pages: pages | null
        setPages: (pages: pages) => void
        
        cardModels: cardModels | null
        setCardModels: (cardModels: cardModels) => void
    },
    hooks: {
        getUserData: () => void
        logOut: () => void
    }
}

export const DataContext = createContext<DataContextValues>({data: {
        token: null,
        user: null,
        ranking: null,
        cardModels: null,
        politicians: null,
        candidates: null,
        parties: null,
        states: null,
        records: null,
        partyRecords: null,
        cards: null,
        stickers: null,
        pages: null,

        setToken: () => {},
        setUser: () => {},
        setPoliticians: () => {},
        setCandidates: () => {},
        setParties: () => {},
        setStates: () => {},
        setRecords: () => {},
        setPartyRecords: () => {},
        setCards: () => {},
        setStickers: () => {},
        setPages: () => {},
        setCardModels: () => {},
        setRanking: () => {}
    },
    hooks: {
        getUserData: () => {},
        logOut: () => {},
    }
})


export function DataProvider ({ children }: PropsWithChildren) {

    const [token, setToken] = useToken();
    const [user, setUser] = useState<person | null>(null)
    
    const [ranking, setRanking] = useState<ranking | null>(null)
    const [politicians, setPoliticians] = useState<politicians | null>(null)
    
    const [deck, setDeck] = useState<deck | null>(null)
    const [cards, setCards] = useState<cards | null>(null)
    const [cardModels, setCardModels] = useState<cardModels | null>(null)

    const [parties, setParties] = useState<parties | null>(null)
    const [states, setStates] = useState<states | null>(null)

    const [album, setAlbum] = useState<album | null>(null)
    const [pages, setPages] = useState<pages | null>(null)
    const [stickers, setStickers] = useState<stickers | null>(null)

    const [candidates, setCandidates] = useState<candidates | null>(null)
    const [partyRecords, setPartyRecords] = useState<partyRecords | null>(null)
    const [records, setRecords] = useState<records | null>(null)

    useEffect(()=>{
        if (!ranking) {
            getRankingData();
        }
        if (token) {
            getUserData();
            getDeckData()
            getAlbumData();
        }
    }, [token])

    const data = {
        token, setToken,
        user, setUser,
        ranking, setRanking,
        politicians, setPoliticians,
        deck, setDeck,
        cards, setCards,
        cardModels, setCardModels,
        parties, setParties,
        states, setStates,
        album, setAlbum,
        pages, setPages,
        stickers, setStickers,
        candidates, setCandidates,
        partyRecords, setPartyRecords,
        records, setRecords
    }

    const hooks = {
        getUserData,
        logOut
    }
    
    return <DataContext.Provider value={{data, hooks}}>{children}</DataContext.Provider>

    async function getUserData() {
        const data = await getUser();
        setUser(data.data);
    }

    async function getRankingData() {
        const res = await getRanking();
        const data = res.data;
        
        console.log(data);

        setRanking(data.ranking);
        setRecords(data.records);
        setStates(data.states);
        setPoliticians(data.politicians);
        setPartyRecords(data.partyRecords);
        setParties(data.parties);
        setCardModels(data.cardModels);
    }

    async function getDeckData() {
        const res = await getDeck();
        const data = res.data;
        
        setDeck(data.deck);
    }

    async function getAlbumData() {
        const res = await getAlbum();
        const data = res.data;
        
        setAlbum(data.album);
        setPages(data.pages);
        setStickers(data.stickers);
    }

    async function logOut() {
        setToken(null);
        setDeck(null);
        setAlbum(null);
        setPages(null);
        setStickers(null);
    }
}